const express = require('express')
const app = express();
const nodemailer = require("nodemailer");

app.use(express.json());

app.post('/',(req,res) =>{

   const { name, email, linkendin, team} = req.body

    //*Cuerpo de correo
    let emailContent = `
		<body
			style="
			background-color: #f7f7f7;
			margin: 0;
			padding: 30px 15px;
			box-sizing: border-box;
			"
		>
			<table
			style="
				width: 100%;
				max-width: 600px;
				padding: 15px;
				background-color: #ffffff;
				margin: 0 auto;
				box-sizing: border-box;
				box-shadow: 0 5px 5px rgba(0, 0, 0, 0.07);
			"
			>
			<tr>
				<td>
				<img
					src="https://evcorp-web.s3.us-east-2.amazonaws.com/xvxv/logo2.png"
					width="100px"
					style="display: block;"
				/>
				<p
					style="
					font-size: 18px;
					color: #000000;
					font-family: Arial, Helvetica, sans-serif;
					"
				>
					Hola XVXV.
				</p>

				<hr style="border: 2px solid rgb(146, 109, 66);" />

				<p
					style="
					font-size: 18px;
					color: #000000;
					font-family: Arial, Helvetica, sans-serif;
					"
				>
					Me llamo ${name} y mi correo electronico es: <b>${email}</b>.
				</p>
				<p
					style="
					font-size: 18px;
					color: #000000;
					font-family: Arial, Helvetica, sans-serif;
					"
				>
					Te cuento que:
				</p>
				<p
					style="
					font-size: 18px;
					color: #000000;
					font-family: Arial, Helvetica, sans-serif;
					"
				>
					${team}
				</p>
				<p
					style="
					font-size: 18px;
					color: #000000;
					font-family: Arial, Helvetica, sans-serif;
					"
				>
					Mis datos de contacto son los siguientes:
				</p>

				<table style="width: 100%;">
					<tr>
					<th
						style="
						padding: 10px;
						background-color: rgb(146, 109, 66);
						font-family: Arial, Helvetica, sans-serif;
						"
					>
						Correo
					</th>
					<th
						style="
						padding: 10px;
						background-color: rgb(146, 109, 66);
						font-family: Arial, Helvetica, sans-serif;
						"
					>
						Linkendin
					</th>
					</tr>
					<tr>
					<td
						style="
						padding: 10px;
						background-color: #f2f2f2;
						font-family: Arial, Helvetica, sans-serif;
						text-align: center;
						"
					>
						<a href="mailto:${email}" style="color: #000000;">${email}</a>
					</td>
					<td
						style="
						padding: 10px;
						background-color: #f2f2f2;
						font-family: Arial, Helvetica, sans-serif;
						text-align: center;
						"
					>
						<a href="tel:${linkendin}" style="color: #000000;">${linkendin}</a>
					</td>
					</tr>
				</table>
				</td>
			</tr>
			</table>
		</body>
	`

    //*De donde se envia el correo
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'tuweb129@gmail.com', // generated ethereal user
          pass: 'zhbu xohx ammh apuz', // generated ethereal password
        },
    });

      //*Datos de envio 
    var mailOptions = {
        from: ' XVXV <marimezamartinez@gmail.com>',
		to: 'mmeza@licorne.mx, ' + email,
        subject: 'Contacto XVXV',
        html: emailContent,
    }

    //*Envio de correo
    transporter.sendMail(mailOptions, ( error, info)=>{

        if(error){
            res.status(500).send(error.message);
        }else{
            console.log("correo enviado")
            res.status(202).jsonp(req.body)
        }
      })
});

const port = process.env.port || 8081;
app.listen(port, ()=> console.log(`Escuchando en puerto ${port}`))