{
  /* Botones de descarga */
}
<div className="inline-block">
  <ReactToPrint
    trigger={() => (
      <button className="btn bg-red-500 text-white hover:bg-red-600 hover:shadow-lg transition ease-in-out duration-150">
        PDF
      </button>
    )}
    content={() => printRef.current}
  />
</div>;


ref = { printRef };

// Referencia para impresión
const printRef = useRef();

{
  loading && <Loader />;
}

{
  error && <p className="text-red-500 text-center mt-4">Error: {error}</p>;
}
