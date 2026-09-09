# Randy A. Medina · Portafolio

Portafolio personal de análisis de datos, estadística y programación. Diseño editorial en petróleo y lima, basado en una estructura de referencia y adaptado al contenido de Randy A. Medina.

## Contenido

- Cinco casos: Power BI, Excel, SQL, regresión en R y modelos predictivos en Python.
- Tres en raya y Tetris con motores originales en Python y adaptaciones JavaScript ejecutadas en Web Workers para una demo inmediata y sin dependencias externas.
- Trayectoria, formación, herramientas y contacto profesional.

## Desarrollo

Node.js 22.13 o superior y pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

La compilación estática se genera en `out/`. Los juegos se ejecutan localmente en Web Workers y conservan sus fuentes Python junto a la adaptación web.

## Publicar en Vercel

Importar este repositorio en Vercel, plan Hobby personal gratuito. Next.js, comando `pnpm build`, directorio de salida automático de Next.js (sin sobrescribirlo en Vercel). No requiere variables de entorno ni base de datos. Los pushes a main activan un nuevo despliegue mediante la integración de GitHub.

El plan gratuito tiene límites: https://vercel.com/docs/plans/hobby. No se requieren planes de pago, dominios propios, Analytics de pago ni una API de IA.

## Editar el contenido

- `app/portfolio.tsx`: textos, proyectos y enlaces.
- `app/globals.css`: colores, tipografía y responsive.
- `public/images`: capturas y gráficos de los casos.
- `public/games`: copias de distribución de los juegos. Sincronizar con sus repositorios al actualizarlos.

## Repositorios

- [analisis-rrhh-power-bi](https://github.com/randymedina10/analisis-rrhh-power-bi)
- [dashboard-ventas-excel](https://github.com/randymedina10/dashboard-ventas-excel)
- [sistema-ventas-sql](https://github.com/randymedina10/sistema-ventas-sql)
- [regresion-estadistica-r](https://github.com/randymedina10/regresion-estadistica-r)
- [modelos-predictivos-python](https://github.com/randymedina10/modelos-predictivos-python)
- [tres-en-raya-python](https://github.com/randymedina10/tres-en-raya-python)
- [tetris-python](https://github.com/randymedina10/tetris-python)

## Alcance y verificación

Los nuevos análisis son proyectos personales reproducibles. Las métricas están calculadas por los scripts de R/Python, con diagnósticos y limitaciones documentados. Los libros de Excel y Power BI se conservan desde el repositorio original; no se atribuyen resultados empresariales no medidos.

Pruebas de los motores Python: 8 casos (victoria, empate, movimientos inválidos, límites, pausa, líneas y fin de partida). La interacción visual completa en navegador no forma parte de esta verificación.

## Referencias

Estructura inicial de referencia: https://v0-portfolio-recreate.vercel.app/ . Implementación propia; no incluye su código ni sus proyectos.
Los motores Python se mantienen como fuente de referencia y las adaptaciones JavaScript replican sus reglas para que la demo web no dependa de un CDN.
