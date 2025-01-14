
export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-[50vh] flex items-center justify-center"
        style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div> {/* Overlay para oscurecer la imagen */}
        <div className="relative text-center text-white px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Cuida la salud y felicidad de tu mascota
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Gestiona datos de salud, dietas, paseos y cuidados.
          </p>
        </div>
      </section>
    </div>
  );
}
