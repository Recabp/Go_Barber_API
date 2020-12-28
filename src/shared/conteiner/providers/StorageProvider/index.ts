import { container } from 'tsyringe';


import IStorageProvider from '../StorageProvider/models/IStorageProvider';
import DiskStorageProvider from '../StorageProvider/implementations/DiskStorageProvider';


const providers = {
  disk: DiskStorageProvider,
}

container.registerSingleton<IStorageProvider>('StorageProvider', providers.disk);
