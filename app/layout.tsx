import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Randy A. Medina · Analista de Datos',description:'Estadística, Power BI, Excel, SQL y proyectos personales en Python. Portafolio de Randy A. Medina, Santo Domingo, República Dominicana.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="es"><body>{children}</body></html>;}

