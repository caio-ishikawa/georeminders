// Sends push notification //
export const sendPushNotification = async (expoToken) => {
    const message = {
      to: expoToken,
      sound: 'default',
      title: 'REMINDER',
      body: 'You are close to your reminder location',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };