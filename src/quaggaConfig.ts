import Quagga from "quagga";

const configureQuagga = (quaggaInstance: typeof Quagga) => {
    const targetElement = document.querySelector('#barcode-scanner') as HTMLElement | null;
  
    if (!targetElement) {
      console.error('Target element not found');
      return;
    }
  
    quaggaInstance.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: targetElement,
          constraints: {
            facingMode: 'environment', // Use 'user' for front camera
          },
          
        },
        decoder: {
          readers: ['ean_reader', 'upc_reader'],
        },
        frequency: 1,
      },
      (err) => {
        if (err) {
          console.error('Error initializing Quagga:', err);
          return;
        }
        quaggaInstance.start();
  
        quaggaInstance.onDetected((result) => {
          console.log('Barcode detected:', result.codeResult.code);
          // Handle the detected barcode here
        });
  
        quaggaInstance.onProcessed((result) => {
          // Your processing logic here
        });
      }
    );
  };
  
  export default configureQuagga;