export const configYaml = `# config.yaml — конфигурация обучения
#
# Здесь Вы указываете архитектуру сети, количество эпох,
# число точек и режим обучения.

# Константы, введённые для удобства
num_initial:    200     # точек на начальном условии
num_boundary:   2000    # точек на каждой границе
num_sample:     50000   # коллокационных точек (внутри области)
num_validation: 250000  # точек для валидации
epochs:         30000   # эпох обучения

# Тренировочный датасет. Имена сэмплеров и их количество — произвольные
train_datasets:
  # Сэмплер сетки
  - mesh_sampler:
      _target_: pinnstorch.data.MeshSampler # тип объекта
      collection_points: [f_T]    # список уравнений PDE
      # если не указывать число точек — система возьмёт все данные, без сэмплирования
      num_sample: \${num_sample}   # число точек
      
  # Сэмплер начальных условий
  - initial_condition:
      _target_: pinnstorch.data.InitialCondition  # тип объекта
      solution: [T]               # ключи, по которым вычисляется начальное условие
      num_sample: \${num_initial}  # число точек
      
  # Сэмплер граничных условий для левой границы
  - left_bc:
      _target_: pinnstorch.data.BoundaryCondition1D # тип объекта
      bc_func_name: left_bc       # ключ для поиска функции в словаре boundary_functions
      location: left              # расположение границы (left, right, both)
      num_sample: \${num_boundary} # число точек
      
  # Сэмплер граничных условий для правой границы
  - right_bc:
      _target_: pinnstorch.data.BoundaryCondition1D # тип объекта
      bc_func_name: right_bc      # ключ для поиска функции в словаре boundary_functions
      location: right             # расположение границы (left, right, both)
      num_sample: \${num_boundary} # число точек

# Валидационный датасет
val_dataset:
  # Сэмплер сетки
  - mesh_sampler:
      _target_: pinnstorch.data.MeshSampler # тип объекта
      solution: [T]               # ключи, по которым вычисляется начальное условие
      num_sample: \${num_validation} # число точек

# Датасет для предугадывания (необходим для построения графика)
pred_dataset:
  # Сэмплер сетки
  - mesh_sampler:
      _target_: pinnstorch.data.MeshSampler # тип объекта
      solution: [T]            # ключи, по которым вычисляется начальное условие

# Архитектура нейросети
net:
  _target_: pinnstorch.models.FCN # тип объекта
  layers: [2, 64, 64, 64, 64, 1]  # слои сети: 2 входа, 4 скрытых слоя, 1 выход
  output_names: [T]               # имена выходов

# Тренер
trainer:
  max_epochs: \${epochs}         # число эпох
  # каждые n эпох система считает и записывает валидационную ошибку
  check_val_every_n_epoch: 250  

# Модуль обучения
model:
  # Оптимизатор
  optimizer:
    _target_: torch.optim.Adam  # тип объекта
    lr: 1e-3                    # скорость обучения (learning rate)
    weight_decay: 1e-6          # затухание весов
    
  # Система поддерживает любые torch.optim, например
  # optimizer:
  #   _target_: torch.optim.LBFGS
  #   lr: 1.0
  #   max_iter: 20
  #   tolerance_grad: 1e-9
  #   tolerance_change: 1e-11
  #   history_size: 100
  #   line_search_fn: strong_wolfe
  # Пример использования: 
  # 1. найти приближение с помощью 20000 эпох на Adam
  # 2. провалиться в локальный минимум с помощью 1000 эпох на LBFGS
  
  # Планировщик скорости обучения (опционально)
  scheduler:
    _target_: torch.optim.lr_scheduler.CosineAnnealingLR # тип объекта
    T_max: \${epochs}           # номер эпохи с минимальным lr
    eta_min: 1e-6               # минимальный lr

# Функции обратного вызова (опционально)
callbacks:
  # ранняя остановка
  early_stopping:
    _target_: lightning.pytorch.callbacks.EarlyStopping # тип объекта
    monitor: val/loss           # значение для отслеживания
    patience: 10                # максимум проверок val/loss без изменений значений
    mode: min                   # тип изменения
    min_delta: 1e-4             # delta изменения
  # система поддерживает все lightning.pytorch.callbacks
  
# Дополнительные метрики, высчитываемые и выводимые при валидации  
optimized_metric:
  error: [T]                    # относительная ошибка
`;
