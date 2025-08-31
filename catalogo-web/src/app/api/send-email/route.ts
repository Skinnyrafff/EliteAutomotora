import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const {
      marca,
      modelo,
      year,
      transmission,
      llaves,
      ownersCount,
      mantenciones,
      description,
    } = await request.json();

    // Create a Nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"), // Default to 587 if not set
      secure: process.env.EMAIL_PORT === "465", // Use SSL if port is 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: "contacto.eliteautomotora@gmail.com", // Recipient address
      subject: `Nueva solicitud de venta de auto: ${marca} ${modelo}`,
      html: `
        <h1>Nueva Solicitud de Venta de Auto</h1>
        <p><strong>Marca:</strong> ${marca}</p>
        <p><strong>Modelo:</strong> ${modelo}</p>
        <p><strong>Año:</strong> ${year}</p>
        <p><strong>Transmisión:</strong> ${transmission}</p>
        <p><strong>Llaves:</strong> ${llaves}</p>
        <p><strong>Cantidad de Dueños:</strong> ${ownersCount}</p>
        <p><strong>Mantenciones:</strong> ${mantenciones}</p>
        <p><strong>Descripción:</strong> ${description}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error: (error as Error).message },
      { status: 500 },
    );
  }
}
