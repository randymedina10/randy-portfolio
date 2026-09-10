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
    metrics: [
      '1.417 empleados',
      '16,3 % de rotación',
      '84 bajas en Administración',
    ],
    problem:
      'Entender qué perfiles, departamentos y condiciones aparecen con mayor frecuencia en la rotación.',
    data: 'Datos de recursos humanos de una empresa farmacéutica en India.',
    method:
      'Preparación en Power Query, medidas DAX y un dashboard segmentado por departamento, salario, edad y rol.',
    finding:
      'Administración concentra 84 de las 231 bajas observadas (36 %), seguida de Ventas con 52 (23 %).',
    deliverable:
      'Dashboard interactivo con 1.417 empleados analizados y segmentación por departamento, edad, salario y rol.',
    limitation:
      'Las diferencias observadas describen asociaciones en este conjunto de datos; no demuestran causalidad ni impacto empresarial.',
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
    metrics: [
      '$1.928.888 en ventas',
      '$247.961 de ganancia',
      'Teléfonos: $279.464',
    ],
    problem:
      'Reunir en una sola lectura el desempeño mensual, territorial y por cliente del negocio.',
    data: 'Registros de ventas, ganancias, clientes, categorías y estados incluidos en el libro del proyecto.',
    method:
      'Tablas dinámicas, gráficos vinculados y segmentadores para navegar los resultados.',
    finding:
      'Teléfonos es la categoría con mayor venta acumulada, con $279.464; diciembre registra el mayor total mensual, con aproximadamente $241 mil.',
    deliverable:
      'Dashboard interactivo en Excel con ventas y ganancias, comparación anual, ranking de clientes y distribución territorial.',
    limitation:
      'Los resultados describen los registros incluidos en el libro y cambian con los filtros; no estiman causalidad ni ventas futuras.',
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
    finding:
      'El modelo obtiene R² ajustado de 0,815 y RMSE leave-one-out de 2,78 mpg, frente a 6,12 mpg para la referencia basada en la media.',
    deliverable:
      'Análisis reproducible con coeficientes, intervalos al 95 %, predicciones, validación y diagnósticos de residuos e influencia.',
    limitation:
      'La muestra es pequeña, histórica y no aleatoria. Las asociaciones no son causales ni deben extrapolarse a vehículos actuales.',
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
    metrics: ['178 muestras', '13 variables', '100 % de exactitud en prueba'],
    problem:
      'Clasificar tres cultivares de vino mediante sus mediciones químicas.',
    data: '178 muestras y 13 variables del conjunto Wine de UCI; 133 para entrenamiento y 45 para prueba.',
    method:
      'Comparación de baseline, regresión logística y random forest con validación cruzada estratificada de cinco particiones.',
    finding:
      'Random forest fue el modelo seleccionado: F1 macro de 0,985 en validación cruzada y 100 % de exactitud en las 45 muestras de prueba.',
    deliverable:
      'Pipeline reproducible con separación estratificada, comparación de tres modelos, predicciones auditables y matriz de confusión.',
    limitation:
      'Wine es un conjunto pequeño y relativamente separable. Una sola partición de prueba no demuestra rendimiento industrial.',
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
    metrics: ['12 tablas', '12 relaciones', '9 consultas'],
    problem:
      'Organizar ventas, inventario, pagos y proveedores sin perder relaciones entre entidades.',
    data: 'Datos de prueba documentados para clientes, productos, sucursales, compras y transacciones.',
    method:
      'Diseño relacional con claves foráneas y consultas de exploración, uniones y agregaciones.',
    finding:
      'Las consultas integran inventario por sucursal, ventas por vendedor, unidades por producto, compras y métodos de pago.',
    deliverable:
      'Script SQL Server con 12 tablas, 12 claves foráneas, datos de prueba y 9 consultas SELECT con JOIN y agregaciones.',
    limitation:
      'Es un esquema educativo con datos ficticios. No incluye seguridad, procedimientos de despliegue ni controles propios de producción.',
    technologies: 'SQL Server · Modelo relacional · Consultas SQL',
    diagram: true,
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
  [
    'Diseño estadístico',
    'Metodología · indicadores · documentación técnica · limpieza de datos',
  ],
  ['Análisis y modelado', 'Python · R · regresión · integración de datos'],
  ['Gestión de datos', 'SQL · bases relacionales · control de calidad'],
  [
    'Comunicación de resultados',
    'Power BI · visualización · reportes · documentación',
  ],
] as const;
