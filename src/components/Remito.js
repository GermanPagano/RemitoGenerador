import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Importar funciones de Firestore
import { db } from '../firebase'; // Asegúrate de tener tu configuración de Firebase aquí
import logo from '../img/logo aeroend.png'; // Logo de AeroEnd
import '../Remito.css'; // Archivo CSS

const Remito = () => {
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(false); // Estado para vista previa
  const [remitoNro, setRemitoNro] = useState(''); // Estado para el número de remito

  const [destinatario, setDestinatario] = useState({
    razonSocial: '',
    domicilio: '',
    localidad: '',
    cuit: '',
    telefono: '',
    cp: '',
    provincia: '',
    otrosDatos: '',
  });

  const [articulos, setArticulos] = useState([
    { descripcion: '', numeroParte: '', numeroSerie: '', cantidad: '' }
  ]);

  const [transportista, setTransportista] = useState({
    nombre: '',
    vehiculo: '',
    lugarEntrega: '',
    horaEntrega: '',
    observaciones: ''
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleDestinatarioChange = (field, value) => {
    setDestinatario({ ...destinatario, [field]: value });
  };

  const handleArticuloChange = (index, field, value) => {
    const nuevosArticulos = [...articulos];
    nuevosArticulos[index][field] = value;
    setArticulos(nuevosArticulos);
  };

  const handleTransportistaChange = (field, value) => {
    setTransportista({ ...transportista, [field]: value });
  };

  const agregarFila = () => {
    setArticulos([...articulos, { descripcion: '', numeroParte: '', numeroSerie: '', cantidad: '' }]);
  };

  const eliminarFila = (index) => {
    const nuevosArticulos = articulos.filter((_, i) => i !== index);
    setArticulos(nuevosArticulos);
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setDestinatario({
      razonSocial: '',
      domicilio: '',
      localidad: '',
      cuit: '',
      telefono: '',
      cp: '',
      provincia: '',
      otrosDatos: '',
    });
    setArticulos([{ descripcion: '', numeroParte: '', numeroSerie: '', cantidad: '' }]);
    setTransportista({
      nombre: '',
      vehiculo: '',
      lugarEntrega: '',
      horaEntrega: '',
      observaciones: ''
    });
  };

  // Función para obtener el número de remito desde Firestore
  const obtenerNumeroRemito = async () => {
    const remitoDoc = doc(db, 'remitos', 'remitoNumber');
    const docSnapshot = await getDoc(remitoDoc);

    if (docSnapshot.exists()) {
      const numeroActual = docSnapshot.data().numero;
      setRemitoNro(numeroActual); // Establecemos el número actual del remito
    } else {
      console.log('El documento no existe.');
      setRemitoNro('000001'); // Si no existe el número, comenzamos desde 000001
    }
  };

  // Función para actualizar el número de remito en Firestore
  const actualizarNumeroRemito = async () => {
    const remitoDoc = doc(db, 'remitos', 'remitoNumber');
    const nuevoNumero = (parseInt(remitoNro) + 1).toString().padStart(6, '0'); // Incrementar el número en 1
    await updateDoc(remitoDoc, { numero: nuevoNumero });
    setRemitoNro(nuevoNumero); // Actualizar el estado con el nuevo número
  };

  useEffect(() => {
    // Llamamos a obtenerNumeroRemito cuando el componente se monta
    obtenerNumeroRemito();
  }, []);

  const generarPDF = () => {
    const doc = new jsPDF();
    const fechaActual = new Date().toLocaleDateString();

    const img = new Image();
    img.src = logo;

    img.onload = function () {
      doc.addImage(img, 'PNG', 15, 10, 30, 15);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Razón Social:", 55, 10);
      doc.text("Teléfono:", 55, 15);
      doc.text("Cód. Postal:", 55, 20);
      doc.text("Dirección:", 55, 25);
      doc.text("Localidad:", 55, 30);
      doc.text("CUIT:", 55, 35);

      doc.setFont("helvetica", "normal");
      doc.text("AeroEnd", 100, 10);
      doc.text("59490204/1130802888", 100, 15);
      doc.text("1714", 100, 20);
      doc.text("Perez Quintana 3468", 100, 25);
      doc.text("Ituzaingo", 100, 30);
      doc.text("30-71769492-5", 100, 35);

      doc.setFont("helvetica", "bold");
      doc.text(`REMITO ${remitoNro}`, 155, 15); // Aquí usamos el número de remito de Firestore
      doc.text("FECHA", 155, 20);
      doc.setFont("helvetica", "normal");
      doc.text(fechaActual, 155, 25);

      doc.rect(10, 5, 190, 35);
      doc.rect(150, 5, 50, 35);

      doc.setFont("helvetica", "bold");
      doc.text("Señor/es:", 15, 50);
      doc.text("Nombre:", 15, 55);
      doc.text("Domicilio:", 15, 60);
      doc.text("Localidad:", 15, 65);
      doc.text("CUIT:", 15, 70);
      doc.text("Otros Datos:", 15, 75);

      doc.setFont("helvetica", "normal");
      doc.text(destinatario.razonSocial || "N/A", 60, 55);
      doc.text(destinatario.domicilio || "N/A", 60, 60);
      doc.text(destinatario.localidad || "N/A", 60, 65);
      doc.text(destinatario.cuit || "N/A", 60, 70);
      doc.text(destinatario.otrosDatos || "N/A", 60, 75);

      doc.setFont("helvetica", "bold");
      doc.text("Teléfono:", 125, 55);
      doc.text("C.P.:", 125, 60);
      doc.text("Provincia:", 125, 65);

      doc.setFont("helvetica", "normal");
      doc.text(destinatario.telefono || "N/A", 160, 55);
      doc.text(destinatario.cp || "N/A", 160, 60);
      doc.text(destinatario.provincia || "N/A", 160, 65);

      doc.rect(10, 45, 190, 35);

      doc.setFont("helvetica", "bold");
      doc.text("Detalles del Artículo:", 14, 90);
      doc.setLineWidth(0.3);
      doc.line(14, 91, 55, 91);

      const articulosCompletados = [
        ...articulos.map((articulo) => [
          articulo.descripcion || 'N/A',
          articulo.numeroParte || 'N/A',
          articulo.numeroSerie || 'N/A',
          articulo.cantidad || 'N/A',
        ]),
      ];

      while (articulosCompletados.length < 5) {
        articulosCompletados.push(['', '', '', '']);
      }

      doc.autoTable({
        startY: 95,
        head: [['Descripción', 'N° Parte', 'N° Serie', 'Cantidad']],
        body: articulosCompletados,
      });

      const finalY = doc.lastAutoTable.finalY || 100;

      doc.setFont("helvetica", "bold");
      doc.text("Datos del Transportista:", 14, finalY + 20);
      doc.setLineWidth(0.3);
      doc.line(14, finalY + 21, 63, finalY + 21);

      doc.setFont("helvetica", "normal");
      doc.text(`Nombre: ${transportista.nombre || "N/A"}`, 14, finalY + 30);
      doc.text(`Vehículo: ${transportista.vehiculo || "N/A"}`, 14, finalY + 35);
      doc.text(`Lugar de Entrega: ${transportista.lugarEntrega || "N/A"}`, 14, finalY + 40);
      doc.text(`Hora de Entrega: ${transportista.horaEntrega || "N/A"}`, 14, finalY + 45);

      doc.text("Observaciones:", 14, finalY + 60);
      doc.rect(14, finalY + 65, 190, 20);
      doc.text(transportista.observaciones || '', 18, finalY + 75);

      doc.text("Recibí Conforme:", 14, finalY + 100);
      doc.line(120, finalY + 105, 190, finalY + 105);
      doc.text("Firma y Sello", 140, finalY + 110);

      doc.save(`remito_${remitoNro}.pdf`);

      // Después de generar el PDF, actualizamos el número de remito en Firestore
      actualizarNumeroRemito();
    };
  };

  const mostrarPreview = () => {
    setPreview(true); // Cambiar el estado para mostrar la vista previa
  };

  const confirmarGenerarRemito = () => {
    generarPDF();
    setPreview(false); // Cerrar vista previa después de generar el remito
    resetForm(); // Limpiar formulario después de la descarga
  };

  return (
    <div className="remito-container">
      <h2>Generar Remito</h2>

      {!preview ? (
        <>
          {/* Step 1: Datos del destinatario */}
          {step === 1 && (
            <div>
              <h3>Datos del Destinatario</h3>
              <div className="form-row">
                <div className="form-field">
                  <label>Razón Social:</label>
                  <input
                    type="text"
                    value={destinatario.razonSocial}
                    onChange={(e) => handleDestinatarioChange('razonSocial', e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Domicilio:</label>
                  <input
                    type="text"
                    value={destinatario.domicilio}
                    onChange={(e) => handleDestinatarioChange('domicilio', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Localidad:</label>
                  <input
                    type="text"
                    value={destinatario.localidad}
                    onChange={(e) => handleDestinatarioChange('localidad', e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>CUIT:</label>
                  <input
                    type="text"
                    value={destinatario.cuit}
                    onChange={(e) => handleDestinatarioChange('cuit', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Teléfono:</label>
                  <input
                    type="text"
                    value={destinatario.telefono}
                    onChange={(e) => handleDestinatarioChange('telefono', e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>C.P.:</label>
                  <input
                    type="text"
                    value={destinatario.cp}
                    onChange={(e) => handleDestinatarioChange('cp', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Provincia:</label>
                  <input
                    type="text"
                    value={destinatario.provincia}
                    onChange={(e) => handleDestinatarioChange('provincia', e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Otros Datos:</label>
                  <input
                    type="text"
                    value={destinatario.otrosDatos}
                    onChange={(e) => handleDestinatarioChange('otrosDatos', e.target.value)}
                  />
                </div>
              </div>
              <button onClick={nextStep}>Continuar</button>
            </div>
          )}

          {/* Step 2: Detalles del artículo */}
          {step === 2 && (
            <div>
              <h3>Detalles del Artículo</h3>
              <table>
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th>N° Parte</th>
                    <th>N° Serie</th>
                    <th>Cantidad</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {articulos.map((articulo, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          value={articulo.descripcion}
                          onChange={(e) => handleArticuloChange(index, 'descripcion', e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={articulo.numeroParte}
                          onChange={(e) => handleArticuloChange(index, 'numeroParte', e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={articulo.numeroSerie}
                          onChange={(e) => handleArticuloChange(index, 'numeroSerie', e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={articulo.cantidad}
                          onChange={(e) => handleArticuloChange(index, 'cantidad', e.target.value)}
                          required
                        />
                      </td>
                      <td>
                        <button type="button" onClick={() => eliminarFila(index)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" onClick={agregarFila}>
                Añadir Línea
              </button>
              <button onClick={prevStep}>Atrás</button>
              <button onClick={nextStep}>Continuar</button>
            </div>
          )}

          {/* Step 3: Datos del transportista */}
          {step === 3 && (
            <div>
              <h3>Datos del Transportista</h3>
              <div className="form-row">
                <div className="form-field">
                  <label>Nombre del Transportista:</label>
                  <input
                    type="text"
                    value={transportista.nombre}
                    onChange={(e) => handleTransportistaChange('nombre', e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Datos del Vehículo:</label>
                  <input
                    type="text"
                    value={transportista.vehiculo}
                    onChange={(e) => handleTransportistaChange('vehiculo', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Lugar de Entrega:</label>
                  <input
                    type="text"
                    value={transportista.lugarEntrega}
                    onChange={(e) => handleTransportistaChange('lugarEntrega', e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Hora de Entrega:</label>
                  <input
                    type="text"
                    value={transportista.horaEntrega}
                    onChange={(e) => handleTransportistaChange('horaEntrega', e.target.value)}
                    required
                  />
                </div>
              </div>
              <label>Observaciones:</label>
              <textarea
                value={transportista.observaciones}
                onChange={(e) => handleTransportistaChange('observaciones', e.target.value)}
                rows="4"
                cols="50"
              ></textarea><br />
              <button onClick={prevStep}>Atrás</button>
              <button onClick={mostrarPreview}>Vista Previa</button> {/* Mostrar la vista previa */}
            </div>
          )}
        </>
      ) : (
        <>
          {/* Vista previa del remito */}
          <div className="preview">
            <h3>Vista Previa del Remito</h3>
            <p><strong>Razón Social:</strong> {destinatario.razonSocial}</p>
            <p><strong>Domicilio:</strong> {destinatario.domicilio}</p>
            <p><strong>Localidad:</strong> {destinatario.localidad}</p>
            <p><strong>CUIT:</strong> {destinatario.cuit}</p>
            <p><strong>Teléfono:</strong> {destinatario.telefono}</p>
            <p><strong>Provincia:</strong> {destinatario.provincia}</p>
            <p><strong>Observaciones:</strong> {transportista.observaciones || 'Sin observaciones'}</p>

            <h4>Artículos</h4>
            <ul>
              {articulos.map((articulo, index) => (
                <li key={index}>
                  {articulo.descripcion} - N° Parte: {articulo.numeroParte} - N° Serie: {articulo.numeroSerie} - Cantidad: {articulo.cantidad}
                </li>
              ))}
            </ul>

            <button onClick={() => setPreview(false)}>Modificar</button> {/* Regresar para modificar */}
            <button onClick={confirmarGenerarRemito}>Confirmar y Generar PDF</button> {/* Generar PDF */}
          </div>
        </>
      )}
    </div>
  );
};

export default Remito;

