import Quagga from "quagga";

//Initializes instance of Quagga with specific configuration to be used in application
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
        frequency: 0.25,
      },
      (err) => {
        if (err) {
          console.error('Error initializing Quagga:', err);
          return;
        }
        quaggaInstance.start();
  
        quaggaInstance.onDetected((result) => {
        });
  
        quaggaInstance.onProcessed((result) => {
        });
      }
    );
  };
  
  export default configureQuagga;