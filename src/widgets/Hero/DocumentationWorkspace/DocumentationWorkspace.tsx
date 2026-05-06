import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { Download } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { useAppDispatch } from '@shared/hooks/redux.ts';
import { modalSlice } from '@app/store/reducers/ModalSlice.ts';
import { functionsPy } from '@widgets/Hero/DocumentationWorkspace/files/functionsPy.tsx';
import { configYaml } from '@widgets/Hero/DocumentationWorkspace/files/configYaml.tsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/User/useAuth.ts';

export const DocumentationWorkspace = () => {
  const { user } = useAuth();

  const dispatch = useAppDispatch();
  const { openModal } = modalSlice.actions;

  const navigate = useNavigate();

  const handleTryNow = () => {
    if (!user) {
      dispatch(openModal('auth'));
      return;
    }
    navigate('/tasks');
  };

  return (
    <Box sx={{ bgcolor: '#F4F9FE', minHeight: '100%' }}>
      {/* ========== Hero-блок ========== */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 4,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={700} gutterBottom>
            PINN нейросети
          </Typography>
          <Typography variant="body1" fontWeight={400} sx={{ opacity: 0.9 }}>
            Physics-Informed Neural Networks — нейросети, которые уважают физику
          </Typography>
        </Container>
      </Box>

      {/* ========== Что такое PINN ========== */}
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Что такое PINN?
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Physics-Informed Neural Networks (PINN) — это класс нейросетей,
          которые обучаются не только на данных, но и на физических законах.
          Вместо того чтобы просто запоминать точки, сеть минимизирует невязку
          дифференциального уравнения.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Обученная модель позволяет мгновенно решать задачи одного семейства,
          допуская изменение параметров уравнения. Что позволяет опровергать
          ошибочные гипотезы и использовать тяжеловесные сеточные методы только
          для самых очных гипотез.
        </Typography>

        <Paper
          sx={{
            p: 3,
            bgcolor: 'primary.50',
            borderLeft: 4,
            borderColor: 'primary.main',
            mt: 3,
          }}
        >
          <Typography variant="body1" fontWeight={500}>
            💡 PINN Automizer — программный комплекс, позволяющий
            сосредоточиться на физике, а не на программировании. Вы пишете
            только PDE и граничные условия в декларативном стиле — всё остальное
            делает система. На текущий момент PINN Automizer может решать только
            одномерные в пространстве PDE.
          </Typography>
        </Paper>
      </Container>

      {/* ========== Тестовая задача ========== */}
      <Container maxWidth="md" sx={{ pb: 3 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Тестовая задача
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Примеры ниже приводятся для{' '}
          <b>одномерного уравнения теплопроводности</b>. Это классическая задача
          распространения тепла в стержне.
        </Typography>

        {/* Параметры области */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: 'white' }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Параметры области
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Длина стержня <InlineMath math="L = 1" />, конечное время{' '}
            <InlineMath math="t_{\max} = 10" />.
          </Typography>
        </Paper>

        {/* Уравнение */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: 'white' }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Уравнение теплопроводности
          </Typography>
          <BlockMath math="\frac{\partial T}{\partial t} = 0.1 \cdot \frac{\partial^2 T}{\partial x^2}" />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            где <InlineMath math="T(x,t)" /> — температура в точке{' '}
            <InlineMath math="x" /> в момент времени <InlineMath math="t" />.
          </Typography>
        </Paper>

        {/* Начальное условие */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: 'white' }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Начальное условие
          </Typography>
          <BlockMath math="T(x, 0) = 20 + 2 \sin\left(-\frac{2\pi x}{2L}\right)" />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            В начальный момент температура распределена по синусоидальному
            закону.
          </Typography>
        </Paper>

        {/* Граничные условия */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: 'white' }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Граничные условия
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>
              Левая граница (Дирихле):
            </Typography>
            <BlockMath math="T(0, t) = 100" />
            <Typography variant="body2" color="text.secondary">
              На левом конце стержня постоянно поддерживается температура 100°C.
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight={500} gutterBottom>
              Правая граница (Нейман):
            </Typography>
            <BlockMath math="\frac{\partial T}{\partial x}(L, t) = 0" />
            <Typography variant="body2" color="text.secondary">
              Правый конец теплоизолирован — поток тепла через него равен нулю.
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ textAlign: 'center', mb: -1 }}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Download />}
            href="/testData/test_data.zip"
            download
          >
            Скачать тестовые данные и уравнения
          </Button>
        </Box>
      </Container>

      {/* ========== Как это работает ========== */}
      <Container maxWidth="md" sx={{ pb: 2 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Как это работает?
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Вы загружаете 3-4 файла: <b>functions.py</b> с описанием PDE и
          граничных условий, <b>config.yaml</b> с параметрами обучения,{' '}
          <b>data.mat</b> с численным решением PDE и (только для дообучения и
          предсказания) чекпоинт с параметрами обученной модели{' '}
          <b>checkpoint.ckpt</b>. Система запускает обучение на GPU, и через
          несколько минут Вы получаете решение.
        </Typography>
      </Container>

      {/* ========== functions.py ========== */}
      <Container maxWidth="md" sx={{ pb: 2 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          functions.py — описание задачи
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Код подробно прокомментирован — читайте и адаптируйте под свою задачу.
        </Typography>
        <Paper elevation={2} sx={{ overflow: 'hidden', borderRadius: 2 }}>
          <SyntaxHighlighter
            language="python"
            style={oneDark}
            showLineNumbers
            customStyle={{ margin: 0, padding: '20px', fontSize: '13px' }}
          >
            {functionsPy}
          </SyntaxHighlighter>
        </Paper>
      </Container>

      {/* ========== config.yaml ========== */}
      <Container maxWidth="md" sx={{ pb: 3 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          config.yaml — параметры обучения
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Настройте сеть, количество эпох и режим обучения.
        </Typography>
        <Paper elevation={2} sx={{ overflow: 'hidden', borderRadius: 2 }}>
          <SyntaxHighlighter
            language="yaml"
            style={oneDark}
            showLineNumbers
            customStyle={{ margin: 0, padding: '20px', fontSize: '13px' }}
          >
            {configYaml}
          </SyntaxHighlighter>
        </Paper>
      </Container>

      {/* ========== Призыв к действию ========== */}
      <Box sx={{ textAlign: 'center', pb: 4 }}>
        <Button
          variant="contained"
          size="large"
          sx={{ px: 6, py: 1.5, fontSize: '1.1rem' }}
          onClick={handleTryNow}
        >
          <img
            src="/logo.svg"
            alt=""
            style={{
              width: 32,
              height: 32,
              marginRight: 20,
              filter: 'brightness(0) invert(1)', // ← инвертирует цвета: синий → белый
            }}
          />
          Попробовать прямо сейчас
        </Button>
      </Box>
    </Box>
  );
};
