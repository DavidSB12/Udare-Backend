const {uploadImageService} = require('./awsConnectionService');

class ImageUploadServiceFactory {
  static createUploadService(provider) {
    switch (provider) {
      case 'AWS':
        return uploadImageService;      
        
        // Otros casos para proveedores adicionales...

      default:
        throw new Error('Proveedor de almacenamiento no válido');
    }
  }
}

module.exports = ImageUploadServiceFactory;


