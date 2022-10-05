export enum StorageKeys {
  cards = 'cards',
  columns = 'columns',
  username = 'username',
}

class StorageService {
  setItem<DataType>(storageKey: StorageKeys, data: DataType): void {
    const stringifiedValue = JSON.stringify(data);
    localStorage.setItem(storageKey, stringifiedValue);
  }
  getItem(storageKey: StorageKeys) {
    const storageItem = localStorage.getItem(storageKey);
    if (storageItem) {
      return JSON.parse(storageItem);
    } else {
      return null;
    }
  }
}

export default StorageService;
