<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Forgot Password</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #4CAF50;
            padding: 20px;
            text-align: center;
            color: white;
            border-radius: 8px 8px 0 0;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            border: 1px solid #4CAF50;
            padding: 20px;
            text-align: center;
        }

        .content h2 {
            color: #333333;
        }

        .content p {
            font-size: 16px;
            line-height: 1.5;
            color: #666666;
        }

        .verification-code {
            display: inline-block;
            padding: 10px 20px;
            font-size: 24px;
            letter-spacing: 2px;
            background-color: #f1f1f1;
            color: #333333;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Forgot Password</h1>
        </div>
        <div class="content">
            <p>Thank you for your trust. To complete the password recovery, please return to the website and enter the verification code below:</p>
            <div class="verification-code">{{ $data['verificationCode'] }}</div>
            <p>This code will expire in 5 minutes.</p>
            <p>If you did not request this code, please ignore this email. Please do not give this code to anyone for any purpose.</p>
        </div>
    </div>
</body>
</html>