import { container } from "tsyringe";

import uploadConfig from "@config/upload";

import IStorageProvider from "./StorageProvider/models/IStorageProvider";
import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";
import IMailProvider from "./MailProvider/models/IMailProvider";
import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";
import IMailTemplateProvider from "./MailTamplateProvider/models/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "./MailTamplateProvider/implementations/HandlebarsMailTemplateProvider";
import ICacheProvider from "./CacheProvider/models/ICacheProvider";
import RedisCacheProvider from "./CacheProvider/implementations/RedisCacheProvider";
import S3StorageProvider from "./StorageProvider/implementations/S3StorageProvider";

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  providers[uploadConfig.driver]
);

container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  HandlebarsMailTemplateProvider
);
container.registerInstance<IMailProvider>(
  "MailProvider",
  container.resolve(EtherealMailProvider)
);

container.registerInstance<ICacheProvider>(
  "CacheProvider",
  container.resolve(RedisCacheProvider)
);
