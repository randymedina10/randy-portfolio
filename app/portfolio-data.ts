export const github = 'https://github.com/randymedina10/';
export const linkedin = 'https://www.linkedin.com/in/randymedinaa5';

export const navItems = [
  ['Áreas de enfoque', 'areas'],
  ['Proyectos', 'proyectos'],
  ['Juegos', 'juegos'],
  ['Trayectoria laboral', 'trayectoria'],
  ['Formación académica', 'formacion'],
  ['Contacto', 'contacto'],
] as const;

export const processSteps = [
  ['01', 'PREGUNTAR', 'DEFINIR · ENTENDER'],
  ['02', 'MEDIR', 'DISEÑAR · RECOLECTAR'],
  ['03', 'ANALIZAR', 'MODELAR · INTERPRETAR'],
  ['04', 'COMUNICAR', 'EXPLICAR · DECIDIR'],
] as const;

export const projects = [
  {
    tag: 'BUSINESS INTELLIGENCE',
    tool: 'POWER BI',
    title: 'Las personas detrás de la rotación',
    desc: 'Un análisis de recursos humanos para explorar bajas, satisfacción laboral y perfiles de empleados.',
    image: 'power-bi.png',
    repo: 'analisis-rrhh-power-bi',
    type: 'Business Intelligence',
    status: 'Caso de portafolio',
    metrics: ['Power Query', 'DAX', 'RR. HH.'],
    problem:
      'Entender qué perfiles, departamentos y condiciones aparecen con mayor frecuencia en la rotación.',
    data: 'Datos de recursos humanos de una empresa farmacéutica en India.',
    method:
      'Preparación en Power Query, medidas DAX y un dashboard segmentado por departamento, salario, edad y rol.',
    result:
      'Una vista interactiva para explorar patrones de rotación sin atribuir impacto empresarial no medido.',
    technologies: 'Power BI · Power Query · DAX',
  },
  {
    tag: 'ANÁLISIS DE NEGOCIO',
    tool: 'EXCEL',
    title: 'Ventas que cuentan una historia',
    desc: 'Ventas, ganancias, clientes y territorio reunidos en un dashboard para explorar el desempeño del negocio.',
    image: 'excel.png',
    repo: 'dashboard-ventas-excel',
    type: 'Business Intelligence',
    status: 'Caso de portafolio',
    metrics: ['Tablas dinámicas', 'Segmentadores', 'Ventas'],
    problem:
      'Reunir en una sola lectura el desempeño mensual, territorial y por cliente del negocio.',
    data: 'Registros de ventas, ganancias, clientes, categorías y estados incluidos en el libro del proyecto.',
    method:
      'Tablas dinámicas, gráficos vinculados y segmentadores para navegar los resultados.',
    result:
      'Un dashboard que conecta tendencias, categorías, clientes rentables y distribución territorial.',
    technologies: 'Excel · Tablas dinámicas · Segmentadores',
  },
  {
    tag: 'REGRESIÓN ESTADÍSTICA',
    tool: 'R',
    title: 'El peso de una buena explicación',
    desc: '¿Cómo se relacionan el peso y la potencia con el consumo de combustible? Regresión múltiple con mtcars.',
    image: 'regression.png',
    repo: 'regresion-estadistica-r',
    type: 'Estadística',
    status: 'Proyecto reproducible',
    metrics: ['32 automóviles', 'R² ajustado 0,815', 'RMSE LOO 2,78 mpg'],
    problem:
      'Estimar cómo se relacionan el peso y la potencia con el consumo de combustible.',
    data: '32 automóviles del conjunto histórico mtcars.',
    method:
      'Modelo OLS, intervalos de confianza al 95 %, análisis de residuos e identificación de observaciones influyentes.',
    result:
      'RMSE leave-one-out de 2,78 mpg frente a 6,12 mpg para la referencia basada en la media; asociación no causal.',
    technologies: 'R · Regresión múltiple · Validación leave-one-out',
  },
  {
    tag: 'MODELOS PREDICTIVOS',
    tool: 'PYTHON',
    title: 'De la química a la predicción',
    desc: 'Comparación de modelos para identificar tres cultivares de vino a partir de sus mediciones químicas.',
    image: 'prediction.png',
    repo: 'modelos-predictivos-python',
    type: 'Data Analytics',
    status: 'Proyecto reproducible',
    metrics: ['178 muestras', '13 variables', '45/45 en prueba'],
    problem:
      'Clasificar tres cultivares de vino mediante sus mediciones químicas.',
    data: '178 muestras y 13 variables del conjunto Wine de UCI; 133 para entrenamiento y 45 para prueba.',
    method:
      'Comparación de baseline, regresión logística y random forest con validación cruzada estratificada de cinco particiones.',
    result:
      'Random forest alcanzó F1 macro 0,985 en validación y 1,000 en prueba; el conjunto es pequeño y separable.',
    technologies: 'Python · scikit-learn · Clasificación',
  },
  {
    tag: 'BASES DE DATOS',
    tool: 'SQL SERVER',
    title: 'Una base sólida para cada venta',
    desc: 'Un sistema relacional que conecta clientes, productos, inventario y transacciones para consultar el negocio.',
    image: null,
    repo: 'sistema-ventas-sql',
    type: 'Data Systems',
    status: 'Proyecto de práctica',
    metrics: ['Modelo relacional', 'JOIN', 'Agregaciones'],
    problem:
      'Organizar ventas, inventario, pagos y proveedores sin perder relaciones entre entidades.',
    data: 'Datos de prueba documentados para clientes, productos, sucursales, compras y transacciones.',
    method:
      'Diseño relacional con claves foráneas y consultas de exploración, uniones y agregaciones.',
    result:
      'Una base práctica y consultable para analizar operaciones de venta; no se presenta como sistema en producción.',
    technologies: 'SQL Server · Modelo relacional · Consultas SQL',
  },
] as const;

export const areas = [
  [
    'Estadística',
    'Inferencia, indicadores y metodología para formular preguntas y analizar resultados.',
    '01',
  ],
  [
    'Data Analytics',
    'Exploración y análisis con Python, R y SQL. Del dato al hallazgo.',
    '02',
  ],
  [
    'Data Systems',
    'Bases de datos y programación para organizar información y automatizar tareas.',
    '03',
  ],
  [
    'Business Intelligence',
    'Power BI, Excel y reportes que hacen la información más fácil de usar.',
    '04',
  ],
] as const;

export const capabilities = [
  ['Diseño estadístico', 'Indicadores · metodología · pruebas de hipótesis'],
  ['Análisis y modelado', 'Python · R · regresión · integración de datos'],
  ['Gestión de datos', 'SQL · bases relacionales · control de calidad'],
  [
    'Comunicación de resultados',
    'Power BI · visualización · reportes · documentación',
  ],
] as const;
