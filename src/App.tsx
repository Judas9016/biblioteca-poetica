import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Heart,
  Moon,
  Sun,
  Feather,
  BookOpen,
  CalendarDays,
  Music2,
  Lamp,
  Coffee,
  X,
} from 'lucide-react';

interface Poema {
  titulo: string;
  fecha: string;
  contenido: string;
  cancion: string;
}

export default function BibliotecaPoetica() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedPoem, setSelectedPoem] = useState<Poema | null>(null);
  const [typedText, setTypedText] = useState('');
  const [introVisible, setIntroVisible] = useState(true);

  const rainAudioRef = useRef<HTMLAudioElement | null>(null);

  const poemas = useMemo<Poema[]>(
    () => [
      {
        titulo: 'La chica que parecía literatura',
        fecha: '28 Mayo 2026',
        cancion: 'Lady Gaga — Always Remember Us This Way',
        contenido:
          'Hay personas que llegan como cualquier otra página, y luego estás tú, que pareces una biblioteca completa. A veces siento que tus ojos guardan historias antiguas y tranquilas, como esas novelas que uno relee solo para sentirse en casa.',
      },
      {
        titulo: 'Lluvia y café',
        fecha: '14 Abril 2026',
        cancion: 'Cigarettes After Sex — Apocalypse',
        contenido:
          'Si algún día me preguntaran cómo se siente la tranquilidad, probablemente hablaría de una noche lluviosa, una taza de café caliente y tú leyendo cerca de una ventana.',
      },
      {
        titulo: 'Ojos color canela',
        fecha: '6 Marzo 2026',
        cancion: 'Joji — Glimpse of Us',
        contenido:
          'Intenté muchas veces describir tus ojos, pero siempre termino sintiendo que las palabras se quedan pequeñas. Hay miradas bonitas, y luego está la tuya.',
      },
    ],
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroVisible(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!selectedPoem) return;

    const text = selectedPoem.contenido;

    let index = 0;

    setTypedText('');

    const interval = setInterval(() => {
      setTypedText(text.slice(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [selectedPoem]);

  useEffect(() => {
    const audio = rainAudioRef.current;

    if (!audio) return;

    audio.volume = 0.12;

    audio.play().catch(() => null);
  }, []);

  return (
    <div
      className={`relative min-h-screen overflow-hidden transition-all duration-700 ${
        darkMode
          ? 'bg-[#0d0907] text-[#f7efe3]'
          : 'bg-[#f5ede3] text-[#2b211b]'
      }`}
    >
      <audio
        ref={rainAudioRef}
        loop
        preload="auto"
        src="https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8d0d4f6fb.mp3"
      />

      {introVisible && (
        <div className="fixed inset-0 z-[500] bg-[#0f0b09] flex items-center justify-center">
          <div className="text-center px-6 animate-pulse">
            <p className="uppercase tracking-[0.5em] text-xs opacity-50 mb-6 text-[#f7efe3]">
              Preparando la biblioteca...
            </p>

            <h1 className="text-5xl md:text-7xl italic text-[#f7efe3] leading-tight">
              Algunas personas
              <br />
              llegan a tu vida...
              <br />
              y parecen literatura.
            </h1>
          </div>
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 90 }).map((_, index) => (
          <div
            key={index}
            className="absolute w-[1px] h-14 bg-white/10 animate-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${0.6 + Math.random()}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,180,120,0.12),transparent_55%)]" />

      <div className="absolute top-16 left-10 opacity-20 text-[120px] animate-float">
        🌷
      </div>

      <div className="absolute bottom-10 right-10 opacity-10 text-[140px] animate-float-delayed">
        🌷
      </div>

      <div className="absolute top-24 right-24 opacity-30 animate-pulse">
        <Lamp size={120} />
      </div>

      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className={`fixed top-5 right-5 z-50 p-4 rounded-full border backdrop-blur-xl transition-all ${
          darkMode
            ? 'bg-[#2b211b]/70 border-[#5f483a]'
            : 'bg-white/70 border-[#d9c6b0]'
        }`}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <section className="relative z-10 px-5 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 opacity-70 mb-6">
              <Heart size={18} />

              <span className="uppercase tracking-[0.4em] text-xs">
                Biblioteca privada
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl leading-tight font-serif mb-8">
              Poemas
              <br />
              para ella
            </h1>

            <p className="max-w-3xl mx-auto text-base md:text-xl opacity-70 leading-9">
              Una colección de pensamientos escritos durante noches lluviosas,
              canciones suaves y momentos donde ella parecía demasiado bonita
              para existir solamente en la realidad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {poemas.map((poema, index) => (
              <div
                key={index}
                onClick={() => setSelectedPoem(poema)}
                className={`group relative overflow-hidden rounded-[35px] border cursor-pointer transition-all duration-700 hover:-translate-y-3 hover:scale-[1.02] ${
                  darkMode
                    ? 'bg-[#1b1511]/70 border-[#5a4537]'
                    : 'bg-white/70 border-[#dcc7af]'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-[#a1795a]/20 to-transparent" />

                <div className="absolute top-5 right-5 opacity-10 text-7xl">
                  📖
                </div>

                <div className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className={`p-3 rounded-full ${
                        darkMode
                          ? 'bg-[#2d221d]'
                          : 'bg-[#f1e3d4]'
                      }`}
                    >
                      <BookOpen size={18} />
                    </div>

                    <div className="flex items-center gap-2 opacity-50 text-sm">
                      <CalendarDays size={14} />
                      {poema.fecha}
                    </div>
                  </div>

                  <h2 className="text-3xl font-serif leading-tight mb-6">
                    {poema.titulo}
                  </h2>

                  <p className="opacity-70 leading-8 overflow-hidden max-h-[14rem]">
                    {poema.contenido}
                  </p>

                  <div className="mt-8 flex items-center gap-3 opacity-60">
                    <Music2 size={16} />

                    <span className="italic text-sm">
                      {poema.cancion}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl opacity-80 hover:opacity-100 transition-all duration-500">
        <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-2 shadow-2xl">
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: '20px' }}
            src="https://open.spotify.com/embed/playlist/7IjySIOfQFTyCxo7TwnqH6?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>

      {selectedPoem && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className={`relative w-full max-w-5xl rounded-[40px] overflow-hidden border shadow-2xl animate-book-open ${
              darkMode
                ? 'bg-[#18120f] border-[#5c4739]'
                : 'bg-[#f8eee3] border-[#dbc7b0]'
            }`}
          >
            <button
              onClick={() => setSelectedPoem(null)}
              className="absolute top-5 right-5 z-50 p-3 rounded-full bg-black/10 hover:bg-black/20 transition-all"
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-2">
              <div
                className={`relative min-h-[400px] flex items-center justify-center overflow-hidden ${
                  darkMode
                    ? 'bg-[#211915]'
                    : 'bg-[#efe1d0]'
                }`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_60%)]" />

                <div className="absolute top-8 left-8 opacity-10 text-[150px]">
                  🌷
                </div>

                <div className="absolute bottom-5 right-5 opacity-10">
                  <Coffee size={90} />
                </div>

                <div
                  className={`w-[240px] h-[340px] rounded-r-md border-l-[12px] shadow-2xl transition-all duration-700 hover:scale-105 ${
                    darkMode
                      ? 'bg-[#2d221d] border-[#120e0c]'
                      : 'bg-[#4a3728] border-[#2f2218]'
                  }`}
                >
                  <div className="h-full flex flex-col justify-between p-7 text-[#f5eadc]">
                    <div>
                      <p className="uppercase tracking-[0.4em] text-[10px] opacity-60 mb-5">
                        Poema privado
                      </p>

                      <h2 className="text-3xl leading-tight font-serif">
                        {selectedPoem.titulo}
                      </h2>
                    </div>

                    <p className="italic opacity-70 text-sm">
                      Escrito solamente para ella.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative p-8 md:p-12 flex flex-col justify-center overflow-y-auto max-h-[90vh]">
                <div className="absolute top-10 right-10 opacity-10">
                  <Feather size={120} />
                </div>

                <div className="flex items-center gap-3 opacity-60 mb-5">
                  <Heart size={16} />

                  <span className="uppercase tracking-[0.3em] text-xs">
                    Biblioteca emocional
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl leading-tight font-serif mb-5">
                  {selectedPoem.titulo}
                </h2>

                <p className="opacity-50 mb-3">
                  {selectedPoem.fecha}
                </p>

                <div className="mb-10 italic opacity-60">
                  “Escuchaba esto mientras escribía”
                  <br />
                  {selectedPoem.cancion}
                </div>

                <div className="leading-10 text-lg opacity-80 whitespace-pre-line min-h-[240px]">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes rain {
          from {
            transform: translateY(-120px);
            opacity: 0;
          }

          to {
            transform: translateY(100vh);
            opacity: 1;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-12px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        @keyframes bookOpen {
          from {
            transform: perspective(2000px) rotateY(-15deg) scale(0.8);
            opacity: 0;
          }

          to {
            transform: perspective(2000px) rotateY(0deg) scale(1);
            opacity: 1;
          }
        }

        .animate-rain {
          animation-name: rain;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
        }

        .animate-book-open {
          animation: bookOpen 0.9s ease;
        }
      `}</style>
    </div>
  );
}