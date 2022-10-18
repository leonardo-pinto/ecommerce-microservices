const HTML_PAYMENT_NOTIFICATION = `
<link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet" />
<body style="margin: 0; font-family: 'Roboto', sans-serif;">
    <div style="background: #f5f5f5; padding: 8vw; margin: 0;">
        <div style="background: white; border-radius: 3px;">
            <div style="padding: 56px 48px 72px 48px;">
                <p style="margin: 0; margin-bottom: 24px; font-weight: 500; color: #5d615d; font-size: 32px;">
                    Hello #NAME,
                </p>
                <p style="margin: 0; margin-bottom: 56px; font-weight: 400; color: #979e97; font-size: 18px;">
                    Your payment (order id #ORDER_ID) has been successfully processed!
                </p>
            </div>
        </div>
        <p style="width: 100%; text-align: center; color: #979e9780; font-size: 14px; margin: 0; margin-top: 24px;">
            This is an automatic message, please do not reply to this e-mail.
        </p>
    </div>
</body>
`;
export default HTML_PAYMENT_NOTIFICATION;
