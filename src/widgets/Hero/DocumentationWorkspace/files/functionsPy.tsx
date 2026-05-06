export const functionsPy = `# functions.py — файл с определением PDE и граничных условий
#
# Этот файл Вы загружаете в систему. Здесь описывается:
#   1. read_data_fn       — как загрузить Ваши .mat данные
#   2. pde_fn             — само дифференциальное уравнение
#   3. boundary_functions — граничные условия (Дирихле, Нейман, ...)
#   4. plot_fn            — (опционально) как отрисовать полученное решение
#
# ВАЖНО: имена функций обязательны.
# Система сама найдёт их в этом файле.

import numpy as np
import torch
import pinnstorch as pt

from typing import Dict, List, Union

def read_data_fn(
  data: Dict[str, np.ndarray]
) -> Dict[str, Union[Dict[str, np.ndarray], np.ndarray]]:
    """
    Обработчик загруженных .mat данных.
    Отвечает за создание mesh всего уравнения
    
    На вход — словарь из Вашего data.mat
    На выход — словарь с ключами spatial, time, solution
    """
    x = data["x"]          # координаты,  формат=[N, 1]
    t = data["t"]          # время,       формат=[T, 1]
    T = data["T"]          # температура, формат=[N, T]

    # Проверка, что это двумерные массивы
    assert len(x.shape) == 2, f"x must be 2D, got shape {x.shape}"
    assert len(t.shape) == 2, f"t must be 2D, got shape {t.shape}"
    assert len(T.shape) == 2, f"T must be 2D, got shape {T.shape}"
    # Проверка, что второй размер = 1 для x и t
    assert x.shape[1] == 1, f"x must be [N, 1], got {x.shape}"
    assert t.shape[1] == 1, f"t must be [T, 1], got {t.shape}"

    return {
        "spatial": x,         # тензор пространства
        "time": t,            # тензор времени
        "solution": {"T": T}, # решение, по его ключам сеть считает уравнение
    }

def pde_fn(
  outputs: Dict[str, torch.Tensor], 
  x: torch.Tensor, 
  t: torch.Tensor
) -> Dict[str, torch.Tensor]:
    """
    Функция декларативного описания PDE
    Отвечает за определение PDE loss
    
    1. outputs — словарь, содержащий выводы нейронной сети по её ключам  
    2. x — тензор координат
    3. t — тензор времени
    
    Для вычисления градиента тензора dy на тензор dx можно использовать
    pt.utils.gradient(
      dy: torch.Tensor,
      dx: Union[List[torch.Tensor], torch.Tensor],
      create_graph: bool = True
    ) -> List[torch.Tensor]
    На выход список из тензоров посчитанных градиентов
    """
    
    T = outputs["T"]
    T_x, T_t = pt.utils.gradient(T, [x, t])
    T_xx = pt.utils.gradient(T_x, x)[0]

    # В декларативном формате опишите PDE
    # Описанное PDE является частью loss функция PINN сети
    # loss(PDE) = dT/dt - 0.1 d^2T/dx^2
    # Ключ "f_t" определяется в config.yaml. Уравнений и их ключей может быть несколько 
    outputs["f_T"] = T_t - 0.1 * T_xx
    return outputs

def bc_left(
  outputs: Dict[str, torch.Tensor], 
  x: torch.Tensor, 
  t: torch.Tensor
) -> Dict[str, torch.Tensor]:
    """
    Функция декларативного описания граничного условия
    Отвечает за определение BC loss
    
    1. outputs — словарь, содержащий выводы нейронной сети по её ключам  
    2. x — тензор координат
    3. t — тензор времени
    
    Левая граница: 
    T(0, t) = 100 (Дирихле)
    """
    
    outputs["left_bc"] = outputs["T"] - 100
    return outputs

def bc_right(
  outputs: Dict[str, torch.Tensor], 
  x: torch.Tensor, 
  t: torch.Tensor
) -> Dict[str, torch.Tensor]:
    """
    Функция декларативного описания граничного условия
    Отвечает за определение BC loss
    
    1. outputs — словарь, содержащий выводы нейронной сети по её ключам  
    2. x — тензор координат
    3. t — тензор времени
    
    Правая граница: 
    dT/dx(L, t) = 0 (Нейман, теплоизоляция)
    """
    
    T_x = pt.utils.gradient(outputs["T"], x)[0]
    outputs["right_bc"] = T_x
    return outputs

# Словарь функций граничных условий.
# Ключи (left_bc, right_bc) описываются в config.yaml
boundary_functions = {
    "left_bc": bc_left,
    "right_bc": bc_right,
}

def plot_fn(
  mesh: pt.data.MeshBase,
  preds: Dict[str, np.ndarray], 
  train_datasets: List[pt.data.SamplerBase], 
  val_dataset: pt.data.SamplerBase
):
    """
    (опционально) Функция описания итогового графики
    Отвечает за внешний вид fig.pdf и fig.eps
    
    1. mesh: pt.data.MeshBase — облако сэмплированных точек
    mesh.ub: [x_max, t_max] — верхняя граница домена
    mesh.lb: [x_min, t_min] — нижняя граница домена
    mesh.spatial_domain: np.ndarray
    mesh.time_domain: np.ndarray
    mesh.solution: Dict[str, np.ndarray]
    mesh.spatial_domain_mesh: np.ndarray, shape=(Nx, Nt, 1) 
    2. preds: Dict[str, np.ndarray] — предугаданные значения
    3. train_datasets: List[pt.data.SamplerBase] — список сэмплеров обучения
    4. val_dataset: pt.SamplerBase — сэмплер валидации
    """
    
    import matplotlib.pyplot as plt
    import matplotlib.gridspec as gridspec
    from mpl_toolkits.axes_grid1 import make_axes_locatable
    
    # Устанавливаем красивый стиль
    plt.style.use('seaborn-v0_8-white')
    plt.rcParams.update({
        'font.family': 'serif',
        'font.size': 12,
        'axes.labelsize': 14,
        'axes.titlesize': 16,
        'xtick.labelsize': 12,
        'ytick.labelsize': 12,
        'legend.fontsize': 12,
    })
    
    # Извлекаем предсказания
    T_pred = preds["T"]
    Exact_T = mesh.solution["T"]  # точное решение из MAT-файла
    T_pred_grid = T_pred.reshape(Exact_T.shape)  # приводим к форме Nx x Nt
    
    # Расчет общей ошибки
    l2_error = np.linalg.norm(Exact_T - T_pred_grid, 2) / np.linalg.norm(Exact_T, 2)
    rmse_error = np.sqrt(np.mean((Exact_T - T_pred_grid)**2))
    
    # Верхний ряд: 2D тепловая карта
    fig = plt.figure(figsize=(14, 10))
    
    # Создаём сетку для верхнего ряда
    gs0 = gridspec.GridSpec(1, 1)
    gs0.update(top=0.92, bottom=0.60, left=0.1, right=0.9)
    ax_top = plt.subplot(gs0[:, :])
    
    # Тепловая карта решения
    im = ax_top.imshow(
        T_pred_grid,
        interpolation="nearest",
        cmap="magma",
        extent=[mesh.lb[1], mesh.ub[1], mesh.lb[0], mesh.ub[0]],
        origin="lower",
        aspect="auto",
    )
    
    # Вывод общей ошибки текстом в углу карты
    bbox_props = {
        "facecolor": "black",
        "alpha": 0.5,
        "edgecolor": "none",
        "boxstyle": "round,pad=0.5"
    }
    ax_top.text(
        0.98, 
        0.05, 
        f'Общая $L_2$ ошибка: {l2_error:.2e}\\nОбщая RMSE ошибка: {rmse_error:.2e}', 
        transform=ax_top.transAxes, 
        color='white', 
        fontweight='bold',
        ha='right',
        va='bottom',
        bbox=bbox_props
    )
    
    # Цветовая шкала
    divider = make_axes_locatable(ax_top)
    cax = divider.append_axes("right", size="3%", pad=0.1)
    cbar = fig.colorbar(im, cax=cax)
    cbar.set_label('Температура $T(x,t)$')
    
    # Добавляем точки данных обучения
    for dataset in train_datasets:
        try:
            x_train, t_train, _ = dataset[:]
            ax_top.scatter(
                t_train.numpy(), x_train.numpy(), 
                marker='x', c='white', s=15, alpha=0.3, label="Train pts"
            )
        except:
            pass
            
    # Вертикальные линии для моментов срезов
    t_slice_indices = [len(mesh.time_domain)//4, 
                       len(mesh.time_domain)//2, 
                       3*len(mesh.time_domain)//4]
    t_array = np.array(mesh.time_domain).flatten()
    
    ax_top.set_xlabel("Время $t$")
    ax_top.set_ylabel("Пространство $x$")
    ax_top.set_title("Предсказанные PINN значения", pad=15)
    
    # Нижний ряд: срезы по времени
    gs1 = gridspec.GridSpec(1, 3)
    gs1.update(top=0.48, bottom=0.12, left=0.1, right=0.9, wspace=0.35)
    
    for i, t_idx in enumerate(t_slice_indices):
        ax = plt.subplot(gs1[0, i])
        # Извлекаем пространственную координату
        x_coords = mesh.spatial_domain_mesh[:, t_idx, 0]
        
        y_exact = Exact_T[:, t_idx]
        y_pred = T_pred_grid[:, t_idx]
        
        ax.plot(x_coords, y_exact, "k-", linewidth=2.5, label="Точное решение", alpha=0.6)
        ax.plot(x_coords, y_pred, "r--", linewidth=2.5, label="Предсказание PINN")
        
        # Локальные метрики для конкретного среза
        t_val = float(t_array[t_idx])
        slice_l2 = np.linalg.norm(y_exact - y_pred, 2) / np.linalg.norm(y_exact, 2)        
        ax.set_title(f"$t = {t_val:.1f}$\\n$L_2$: {slice_l2:.2e}", fontsize=13, fontweight='bold')
        
        ax.set_xlabel("$x$")
        if i == 0: ax.set_ylabel("$T(x,t)$")
        
        ax.grid(True, linestyle=':', alpha=0.6)
        ax.spines[['top', 'right']].set_visible(False)
        
        if i == 1:
            ax.legend(
                loc='upper center', 
                bbox_to_anchor=(0.5, -0.35), 
                ncol=2, 
                frameon=True,
                shadow=True
            )
    
    fig.subplots_adjust(bottom=0.1)
    return fig
`;
