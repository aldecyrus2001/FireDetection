<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sensor Alert Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
        }
        .alert-box {
            border: 1px solid #f44336;
            background-color: #fdecea;
            padding: 20px;
            border-radius: 6px;
        }
        .reading-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        .reading-table th,
        .reading-table td {
            border: 1px solid #ddd;
            padding: 10px;
        }
        .reading-table th {
            background-color: #f44336;
            color: white;
        }
    </style>
</head>
<body>

    <h2>🚨 Emergency Alert Triggered</h2>

    <div class="alert-box">
        <p>
            A sensor located at <strong>{{ $sensorName }}</strong> has detected hazardous levels of gas or fire.
        </p>

        <p>
            <strong>Alert Level:</strong> {{ $level }}
        </p>

        <table class="reading-table">
            <thead>
                <tr>
                    <th>Gas Type</th>
                    <th>Detected Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Liquefied Petroleum Gas (LPG)</td>
                    <td>{{ $lpg }} ppm</td>
                </tr>
                <tr>
                    <td>Carbon Monoxide (CO)</td>
                    <td>{{ $co }} ppm</td>
                </tr>
                <tr>
                    <td>Smoke Level</td>
                    <td>{{ $smoke }} ppm</td>
                </tr>
                <tr>
                    <td>Fire Detected</td>
                    <td>{{ $fire == 1 ? 'Yes' : 'No' }}</td>
                </tr>
            </tbody>
        </table>

        <p style="margin-top: 20px;">
            Please take immediate action and investigate the situation. Safety protocols should be followed to ensure the wellbeing of all personnel.
        </p>
    </div>

    <p style="margin-top: 30px;">
        Regards,<br>
        <strong>Smart Sensor Monitoring System</strong>
    </p>

</body>
</html>
