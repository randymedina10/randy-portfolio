'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUp, Mail, Phone } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  areas,
  capabilities,
  github,
  linkedin,
  navItems,
  processSteps,
  projects,
} from './portfolio-data';

type Project = (typeof projects)[number];

const sqlDiagramNodes = [
  ['Usuarios', 24, 22],
  ['Clientes', 24, 106],
  ['Sucursales', 24, 274],
  ['Ventas', 220, 106, 'primary'],
  ['Pagos', 416, 22],
  ['DetalleVenta', 416, 106, 'primary'],
  ['Inventario', 220, 274],
  ['Productos', 612, 106, 'primary'],
  ['Categorías', 760, 22],
  ['Descuentos', 760, 106],
  ['Compras', 612, 274],
  ['Proveedores', 760, 274],
] as const;

const sqlDiagramRelations = [
  [164, 44, 220, 128],
  [164, 128, 220, 128],
  [164, 296, 220, 146],
  [360, 128, 416, 44],
  [360, 128, 416, 128],
  [556, 128, 612, 128],
  [164, 296, 220, 296],
  [360, 296, 612, 146],
  [682, 106, 830, 66],
  [752, 128, 760, 128],
  [682, 274, 682, 150],
  [752, 296, 760, 296],
] as const;

function SqlRelationshipDiagram() {
  return (
    <figure className="er-figure">
      <svg
        className="er-diagram"
        viewBox="0 0 900 350"
        aria-labelledby="er-title er-description"
      >
        <title id="er-title">
          Diagrama entidad-relación del sistema de ventas
        </title>
        <desc id="er-description">
          Doce tablas conectan usuarios, clientes, ventas, pagos, detalle,
          productos, categorías, inventario, sucursales, compras, proveedores y
          descuentos.
        </desc>
        <g className="er-relations" aria-hidden="true">
          {sqlDiagramRelations.map(([x1, y1, x2, y2], index) => (
            <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </g>
        <g>
          {sqlDiagramNodes.map(([name, x, y, variant]) => (
            <g
              className={
                variant === 'primary' ? 'er-node is-primary' : 'er-node'
              }
              key={name}
              transform={`translate(${x} ${y})`}
            >
              <rect width="140" height="44" rx="5" />
              <text x="70" y="27" textAnchor="middle">
                {name}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <figcaption>12 tablas · 12 relaciones con claves foráneas</figcaption>
    </figure>
  );
}

function SectionHeading({
  children,
  description,
}: {
  children: React.ReactNode;
  description: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <h2>{children}</h2>
      <p>{description}</p>
    </div>
  );
}

function SocialIcon({
  type,
}: {
  type: 'github' | 'linkedin' | 'mail' | 'phone';
}) {
  if (type === 'github')
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="currentColor"
      >
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.3c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
      </svg>
    );
  if (type === 'linkedin')
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="currentColor"
      >
        <path d="M20.5 3H3.5A.5.5 0 0 0 3 3.5v17a.5.5 0 0 0 .5.5h17a.5.5 0 0 0 .5-.5v-17a.5.5 0 0 0-.5-.5ZM8.3 18H5.7V9.7h2.6V18ZM7 8.6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM18.3 18h-2.6v-4c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.2v4h-2.6V9.7h2.5v1.1h.1c.3-.7 1.2-1.4 2.5-1.4 2.6 0 3.1 1.7 3.1 4V18Z" />
      </svg>
    );
  const Icon = type === 'mail' ? Mail : Phone;
  return <Icon aria-hidden="true" size={18} strokeWidth={1.8} />;
}

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}) {
  return (
    <article
      className="project"
      data-reveal
      style={{ '--delay': `${(index % 2) * 90}ms` } as CSSProperties}
    >
      <button
        className="project-visual"
        onClick={() => onSelect(project)}
        aria-label={'Ver caso: ' + project.title}
      >
        {project.image ? (
          // oxlint-disable-next-line next/no-img-element -- Static export uses local, dimensioned portfolio captures.
          <img
            src={'/images/' + project.image}
            alt={'Visualización del proyecto ' + project.title}
            loading="lazy"
            width="1500"
            height="950"
          />
        ) : (
          <div className="sql-preview">
            <span>VENTAS / ESQUEMA RELACIONAL</span>
            <code>
              SELECT
              <br />
              &nbsp; cliente, producto,
              <br />
              &nbsp; SUM(total) AS ventas
              <br />
              FROM decisiones
              <br />
              <i>GROUP BY lo_que_importa;</i>
            </code>
            <small>Representación conceptual del proyecto</small>
          </div>
        )}
      </button>
      <div className="project-copy">
        <p className="eyebrow">
          {project.tag} <span>/ {project.tool}</span>
        </p>
        <span className="project-status">{project.status}</span>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="metrics">
          {project.metrics.map((metric) => (
            <span key={metric}>{metric}</span>
          ))}
        </div>
        <div className="project-links">
          <button className="text-link" onClick={() => onSelect(project)}>
            Ver caso completo <i aria-hidden="true">↗</i>
          </button>
          <a
            href={github + project.repo}
            target="_blank"
            rel="noreferrer"
            aria-label={'Abrir repositorio de ' + project.title}
          >
            Repositorio <i aria-hidden="true">↗</i>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<Project | null>(null);
  const [game, setGame] = useState('tres-en-raya');
  const [playing, setPlaying] = useState(false);
  const [gameSrc, setGameSrc] = useState('');
  const gameRequest = useRef(0);
  const [activeSection, setActiveSection] = useState('');
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const revealItems = [
      ...document.querySelectorAll<HTMLElement>('[data-reveal]'),
    ];
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    let revealObserver: IntersectionObserver | undefined;
    if (reducedMotion || !('IntersectionObserver' in window))
      revealItems.forEach((item) => item.classList.add('is-visible'));
    else {
      revealObserver = new IntersectionObserver(
        (entries, observer) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.12 },
      );
      revealItems.forEach((item) => revealObserver?.observe(item));
    }

    return () => revealObserver?.disconnect();
  }, [filter]);

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter((item): item is HTMLElement => Boolean(item));
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => sectionObserver.observe(section));
    const onScroll = () =>
      setShowTop(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      sectionObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const filteredProjects = projects.filter(
    (project) => filter === 'Todos' || project.type === filter,
  );

  const startGame = async (gameName: string) => {
    const request = ++gameRequest.current;
    const directory = '/games/' + gameName;
    const htmlUrl = directory + '/index.html';
    let resolvedUrl = htmlUrl;

    setPlaying(true);
    setGameSrc('');
    try {
      const response = await fetch(htmlUrl, {
        method: 'HEAD',
        cache: 'no-store',
      });
      if (!response.ok) resolvedUrl = directory + '/index';
    } catch {
      // Static hosts that preserve .html use the original URL.
    }

    if (request === gameRequest.current) setGameSrc(resolvedUrl);
  };

  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="nav">
        <a className="brand" href="#contenido" aria-label="Ir al inicio">
          <b aria-hidden="true">
            R<span>.</span>
          </b>
          <span className="brand-copy">
            <strong>Randy A. Medina</strong>
            <small>Analista de Datos</small>
          </span>
        </a>
        <nav aria-label="Principal">
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={'#' + id}
              aria-current={activeSection === id ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
          <a
            className="pill github-link"
            href={github}
            target="_blank"
            rel="noreferrer"
            aria-label="Ver GitHub de Randy Medina"
          >
            <SocialIcon type="github" /> GitHub <i aria-hidden="true">↗</i>
          </a>
        </nav>
      </header>

      <main id="contenido">
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow" data-reveal>
            ESTADÍSTICA · ANÁLISIS DE DATOS — SANTO DOMINGO, RD
          </p>
          <h1 id="hero-title" data-reveal>
            Datos que ayudan a<br />
            <em>entender y decidir.</em>
          </h1>
          <div className="hero-bottom" data-reveal>
            <p className="intro">
              Soy <strong>Randy A. Medina.</strong> Analista de datos y
              estudiante de Estadística. Trabajo con información del Sistema
              Estadístico Nacional: desde su levantamiento y preparación hasta
              el análisis y la comunicación de resultados.
            </p>
            <a href="#proyectos" className="hero-link">
              Explorar mi trabajo <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="process" aria-label="Proceso de trabajo">
            {processSteps.map(([number, name, actions], index) => (
              <div
                className="process-step"
                data-reveal
                style={{ '--delay': `${index * 90}ms` } as CSSProperties}
                key={number}
              >
                <span className="process-number">{number}</span>
                <b>{name}</b>
                <span>{actions}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="areas" className="section">
          <p className="eyebrow" data-reveal>
            01 / ÁREAS DE ENFOQUE
          </p>
          <SectionHeading description="Me interesa entender qué hay detrás de los números, trabajar con cuidado y explicar lo que los datos permiten decir.">
            La pregunta primero.
            <br />
            <em>Las herramientas después.</em>
          </SectionHeading>
          <div className="areas">
            {areas.map(([name, desc, num], index) => (
              <button
                key={name}
                className="area"
                data-reveal
                style={{ '--delay': `${index * 70}ms` } as CSSProperties}
                onClick={() => {
                  setFilter(name);
                  document
                    .getElementById('proyectos')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="number">{num}</span>
                <h3>{name}</h3>
                <p>{desc}</p>
                <span className="text-link">
                  Explorar proyectos <i aria-hidden="true">↗</i>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section id="proyectos" className="section section-landmark">
          <p className="eyebrow" data-reveal>
            02 / TRABAJO
          </p>
          <SectionHeading description="Análisis, visualizaciones y código. Cada caso permite revisar el problema, los datos, el método y el resultado.">
            Preguntas concretas.
            <br />
            <em>Resultados verificables.</em>
          </SectionHeading>
          <div className="filters" aria-label="Filtrar proyectos" data-reveal>
            {['Todos', ...areas.map((area) => area[0])].map((name) => (
              <button
                key={name}
                aria-pressed={filter === name}
                className={filter === name ? 'active' : ''}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="projects">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                project={project}
                index={index}
                onSelect={setSelected}
                key={project.repo}
              />
            ))}
          </div>
        </section>

        <section id="juegos" className="section games-section">
          <p className="eyebrow" data-reveal>
            03 / LABORATORIO
          </p>
          <SectionHeading description="Dos proyectos de lógica desarrollados originalmente en Python y adaptados a JavaScript para ejecutarse directamente en el navegador.">
            También se aprende
            <br />
            <em>jugando.</em>
          </SectionHeading>
          <div data-reveal>
            <Tabs
              className="portfolio-tabs"
              value={game}
              onValueChange={(value) => {
                gameRequest.current += 1;
                setGame(String(value));
                setPlaying(false);
                setGameSrc('');
              }}
            >
              <TabsList className="game-tabs">
                <TabsTrigger value="tres-en-raya">Tres en raya</TabsTrigger>
                <TabsTrigger value="tetris">Tetris</TabsTrigger>
              </TabsList>
              {['tres-en-raya', 'tetris'].map((currentGame) => (
                <TabsContent key={currentGame} value={currentGame}>
                  <div className="game-layout">
                    <div className="game-description">
                      <p className="eyebrow">
                        PYTHON · JAVASCRIPT / PROYECTO PERSONAL
                      </p>
                      <h3>
                        {currentGame === 'tetris'
                          ? 'Orden dentro del caos.'
                          : 'Tres casillas. Una estrategia.'}
                      </h3>
                      <p>
                        {currentGame === 'tetris'
                          ? 'Siete piezas, líneas que desaparecen y una partida que acelera. Mueve, gira y encaja cada bloque.'
                          : 'Juega con otra persona o reta a la computadora. Elige tu ficha y completa una fila, columna o diagonal.'}
                      </p>
                      <a
                        className="text-link"
                        href={
                          github +
                          (currentGame === 'tetris'
                            ? 'tetris-python'
                            : 'tres-en-raya-python')
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ver código en GitHub <i aria-hidden="true">↗</i>
                      </a>
                      <div
                        className="game-tech"
                        aria-label="Conceptos técnicos del proyecto"
                      >
                        {(currentGame === 'tetris'
                          ? [
                              'Matrices',
                              'Detección de colisiones',
                              'Gestión de estados',
                              'Dificultad progresiva',
                            ]
                          : [
                              'Minimax',
                              'Árbol de decisiones',
                              'Estados del juego',
                            ]
                        ).map((concept) => (
                          <span key={concept}>{concept}</span>
                        ))}
                      </div>
                      <div className="game-notes">
                        {currentGame === 'tetris'
                          ? 'Teclado: flechas para mover y girar · espacio para caída rápida · P para pausar. Controles táctiles incluidos.'
                          : 'Tres niveles: fácil para practicar, medio con táctica y difícil con Minimax. También conserva el modo de dos jugadores.'}
                      </div>
                    </div>
                    <div className="game-stage">
                      {playing && currentGame === game && gameSrc ? (
                        <iframe
                          title={
                            currentGame === 'tetris'
                              ? 'Jugar Tetris'
                              : 'Jugar tres en raya'
                          }
                          src={gameSrc}
                          className={
                            currentGame === 'tetris'
                              ? 'tetris-frame'
                              : 'ttt-frame'
                          }
                        />
                      ) : (
                        <div className="game-start">
                          <span className="game-symbol" aria-hidden="true">
                            {currentGame === 'tetris' ? '▟' : '× ○'}
                          </span>
                          <button
                            className="primary"
                            disabled={playing && currentGame === game}
                            onClick={() => void startGame(currentGame)}
                          >
                            {playing && currentGame === game
                              ? 'Preparando juego…'
                              : 'Jugar ' +
                                (currentGame === 'tetris'
                                  ? 'Tetris'
                                  : 'tres en raya')}
                          </button>
                          <small>
                            El juego se ejecuta localmente en tu navegador.
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section id="trayectoria" className="section">
          <p className="eyebrow" data-reveal>
            04 / TRAYECTORIA LABORAL
          </p>
          <SectionHeading description="Precisión en el análisis, ética en el manejo de la información y claridad al compartir resultados.">
            Datos con
            <br />
            <em>responsabilidad.</em>
          </SectionHeading>
          <div className="timeline" data-reveal>
            <aside className="experience-meta">
              <div className="date">MAR 2025 — PRESENTE</div>
              <span className="experience-current">POSICIÓN ACTUAL</span>
              <p>
                Sistema Estadístico Nacional · Indicadores · Calidad del dato
              </p>
            </aside>
            <div className="experience-role">
              <p className="eyebrow">OFICINA NACIONAL DE ESTADÍSTICA</p>
              <h3>
                Técnico de levantamiento y análisis de operaciones estadísticas
              </h3>
              <p className="role-lead">
                Trabajo técnico con operaciones estadísticas, registros
                administrativos e indicadores nacionales: desde el levantamiento
                y la limpieza hasta la documentación y presentación de
                resultados.
              </p>
              <ol className="experience-list">
                <li>
                  <span>01</span>
                  <p>
                    Levantamiento, actualización y monitoreo de operaciones
                    estadísticas y registros administrativos de las
                    instituciones que conforman el Sistema Estadístico Nacional
                    (SEN).
                  </p>
                </li>
                <li>
                  <span>02</span>
                  <p>
                    Monitoreo y evaluación de los indicadores país de los
                    Objetivos de Desarrollo Sostenible (ODS), así como su
                    actualización periódica.
                  </p>
                </li>
                <li>
                  <span>03</span>
                  <p>
                    Manejo de bases de datos de los diferentes inventarios del
                    departamento.
                  </p>
                </li>
                <li>
                  <span>04</span>
                  <p>
                    Creación de dashboards informativos para la presentación de
                    indicadores.
                  </p>
                </li>
                <li>
                  <span>05</span>
                  <p>
                    Preparación, limpieza y presentación de bases de datos en
                    Excel.
                  </p>
                </li>
                <li>
                  <span>06</span>
                  <p>
                    Creación de informes, manuales metodológicos y manuales de
                    uso, de acuerdo con las necesidades del departamento.
                  </p>
                </li>
                <li>
                  <span>07</span>
                  <p>
                    Análisis de factibilidad y consistencia de indicadores de
                    demanda (PNPSP, ODS, PEN y END).
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section id="formacion" className="section">
          <p className="eyebrow" data-reveal>
            05 / FORMACIÓN ACADÉMICA
          </p>
          <SectionHeading description="Formación universitaria y cursos enfocados en convertir fundamentos estadísticos en soluciones aplicadas.">
            Una base estadística.
            <br />
            <em>Aprendizaje continuo.</em>
          </SectionHeading>
          <div className="education-main" data-reveal>
            <span className="date">AGO 2022 — PRESENTE</span>
            <div>
              <span className="badge">EN CURSO</span>
              <h3>
                Licenciatura en Estadística
                <br />
                Mención Socioeconómica
              </h3>
              <p>Universidad Autónoma de Santo Domingo (UASD)</p>
              <p>
                Estadística descriptiva e inferencial, probabilidad y modelos de
                regresión.
              </p>
            </div>
          </div>
          <div className="courses">
            {[
              ['Power BI', 'Universidad Dominico Americano'],
              ['Excel: Power Pivot, DAX y Power Query', 'Udemy'],
              [
                'Introducción a las bases de datos',
                'Instituto Tecnológico de Las Américas (ITLA)',
              ],
              [
                'Ciencia de Datos para la Explotación de Datos',
                'Escuela Nacional de Estadística · ONE',
              ],
            ].map(([name, source], index) => (
              <div
                key={name}
                data-reveal
                style={{ '--delay': `${(index % 2) * 70}ms` } as CSSProperties}
              >
                <h3>{name}</h3>
                <p>{source}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="capacidades">
          <p className="eyebrow" data-reveal>
            06 / CAPACIDADES
          </p>
          <SectionHeading description="Las tecnologías se organizan por lo que permiten diseñar, analizar, gestionar y comunicar.">
            Herramientas al servicio
            <br />
            <em>de una contribución.</em>
          </SectionHeading>
          <div className="stack">
            {capabilities.map(([name, description], index) => (
              <div
                key={name}
                data-reveal
                style={{ '--delay': `${index * 70}ms` } as CSSProperties}
              >
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contacto" className="section contact section-landmark">
          <p className="eyebrow" data-reveal>
            07 / CONVERSEMOS
          </p>
          <SectionHeading description="Disponible para conversar sobre análisis, estadística, visualización y sistemas de información.">
            La próxima buena pregunta
            <br />
            <em>puede empezar aquí.</em>
          </SectionHeading>
          <div className="contact-links" data-reveal>
            <a href="mailto:randymedinaa5@gmail.com">
              <span>
                <SocialIcon type="mail" /> Email
              </span>
              randymedinaa5@gmail.com <i aria-hidden="true">↗</i>
            </a>
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              aria-label="Ver GitHub de Randy Medina"
            >
              <span>
                <SocialIcon type="github" /> GitHub
              </span>
              randymedina10 <i aria-hidden="true">↗</i>
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Ver LinkedIn de Randy Medina"
            >
              <span>
                <SocialIcon type="linkedin" /> LinkedIn
              </span>
              randymedinaa5 <i aria-hidden="true">↗</i>
            </a>
            <a
              href="tel:+18295531466"
              aria-label="Llamar a Randy Medina al +1 829 553 1466"
            >
              <span>
                <SocialIcon type="phone" /> Teléfono
              </span>
              +1 829-553-1466 <i aria-hidden="true">↗</i>
            </a>
            <div>
              <span>Ubicación</span>Santo Domingo, República Dominicana
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>RANDY A. MEDINA · ANALISTA DE DATOS</span>
        <span>© 2026 · CURIOSIDAD CON MÉTODO</span>
      </footer>
      <button
        className={'back-to-top' + (showTop ? ' is-visible' : '')}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver arriba"
      >
        <ArrowUp aria-hidden="true" size={20} />
      </button>

      <Dialog
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="case-modal" showCloseButton={false}>
          {selected && (
            <>
              <p className="eyebrow">
                {selected.status} · {selected.tool}
              </p>
              <DialogTitle className="case-title">{selected.title}</DialogTitle>
              <DialogDescription className="case-description">
                {selected.desc}
              </DialogDescription>
              {selected.image && (
                // oxlint-disable-next-line next/no-img-element -- Static export uses a local, dimensioned case-study image.
                <img
                  src={'/images/' + selected.image}
                  alt={'Resultados de ' + selected.title}
                />
              )}
              <dl className="case-study-grid">
                <div>
                  <dt>Problema</dt>
                  <dd>{selected.problem}</dd>
                </div>
                <div>
                  <dt>Datos</dt>
                  <dd>{selected.data}</dd>
                </div>
                <div>
                  <dt>Método</dt>
                  <dd>{selected.method}</dd>
                </div>
                <div>
                  <dt>Hallazgo</dt>
                  <dd>{selected.finding}</dd>
                </div>
                <div>
                  <dt>Entregable</dt>
                  <dd>{selected.deliverable}</dd>
                </div>
                <div>
                  <dt>Limitación</dt>
                  <dd>{selected.limitation}</dd>
                </div>
                <div>
                  <dt>Tecnologías</dt>
                  <dd>{selected.technologies}</dd>
                </div>
              </dl>
              {'diagram' in selected && selected.diagram && (
                <SqlRelationshipDiagram />
              )}
              <div className="project-links">
                <a
                  className="text-link"
                  href={github + selected.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Explorar repositorio <i aria-hidden="true">↗</i>
                </a>
                <DialogClose className="pill">Cerrar</DialogClose>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
