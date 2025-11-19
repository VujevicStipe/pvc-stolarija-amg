import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ime, prezime, email, telefon, poruka } = body;

    if (!ime || !email || !poruka) {
      return NextResponse.json(
        { error: 'Ime, email i poruka su obavezni' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'AMG Kontakt <onboarding@resend.dev>',
      to: [process.env.EMAIL_TO || 'info@amg-pvc.hr'],
      replyTo: email,
      subject: `Novi upit od ${ime} ${prezime}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 8px;
              }
              .header {
                background-color: #0d9f5a;
                color: white;
                padding: 20px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .content {
                background-color: white;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .field {
                margin-bottom: 15px;
              }
              .label {
                font-weight: bold;
                color: #0d9f5a;
              }
              .value {
                margin-top: 5px;
                padding: 10px;
                background-color: #f5f5f5;
                border-radius: 4px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Novi kontakt upit - AMG PVC</h2>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Ime i prezime:</div>
                  <div class="value">${ime} ${prezime}</div>
                </div>
                
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                
                ${telefon ? `
                <div class="field">
                  <div class="label">Telefon:</div>
                  <div class="value"><a href="tel:${telefon}">${telefon}</a></div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="label">Poruka:</div>
                  <div class="value">${poruka.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Email uspješno poslan!',
      id: data?.id 
    });

  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Greška pri slanju emaila' },
      { status: 500 }
    );
  }
}