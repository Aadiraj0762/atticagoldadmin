export default function SalePrint() {
  return (
    <>
      <iframe
        id="ifmcontentstoprint"
        style={{ display: 'none', height: '0px', width: '0px', position: 'absolute' }}
        title="pdf"
      />
      <div id="pdf">
        <h2>Pdf</h2>
      </div>
      <button
        className="no-print"
        onClick={() => {
          const content = document.getElementById('pdf');
          const pri = document.getElementById('ifmcontentstoprint').contentWindow;
          pri.document.open();
          pri.document.write(content.innerHTML);
          pri.document.close();
          pri.focus();
          pri.print();
        }}
      >
        Print
      </button>
    </>
  );
}
