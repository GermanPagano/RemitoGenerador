// src/components/Inicio.js
import React from 'react';

const Inicio = () => {
  return (
<div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)' }}>
  <h2 style={{ textAlign: 'center', color: '#333' }}>Bienvenido a la interfaz</h2>
  <p style={{ textAlign: 'justify', lineHeight: '1.6', fontSize: '16px', color: '#555' }}>
    Esta Web App es una aplicación web que permite a los usuarios generar remitos de manera rápida y sencilla. En esta versión inicial, los usuarios pueden ingresar los datos del destinatario, detalles del artículo y datos del transportista para generar un remito en formato PDF, ideal para procesos de logística y control de envíos. Todo el proceso se realiza de manera digital, facilitando la organización y almacenamiento de remitos.
  </p>
  <p style={{ textAlign: 'justify', lineHeight: '1.6', fontSize: '16px', color: '#555' }}>
    Próximamente, Formularia incluirá nuevos módulos que ampliarán las funcionalidades de la plataforma. Estos futuros módulos permitirán gestionar inventarios, seguimiento de entregas, y mucho más, convirtiéndose en una herramienta integral para empresas y negocios que buscan optimizar sus operaciones logísticas. Esta es solo la primera etapa de una aplicación con gran potencial de expansión.
  </p>
</div>


  );
};

export default Inicio;
