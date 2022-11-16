export enum DeliveryStatusEnum {
  ASSIGNED = 'Atanmış',
  CANCEL = 'İptal',
  COMPLETE = 'Tamamlandı',
  WAIT = 'Bekleniyor',
  ASSIGNING = 'Atanacak',
  ONWAY = 'Yolda',
}

export enum DeliverySlotEnum {
  MANUEL = 'Kurye manuel',
  SLOT = 'Market sistemi',
  DIRECT = 'Entegrasyon',
  RMANUEL = 'Restoran manuel',
}

export enum DeliveryCompleteStatusEnum {
  SUCCESS = 'Problemsiz tamamlandı',
  MISSING_ITEM = 'Eksik ürünle tamamlandı',
  WRONG_ITEMS = 'Yanlış ürünle tamamlandı',
  NOT_PAYMENT = 'Tamamlandı & Ödeme Alınamadı',
  NOT_IN_ADDRESS = 'Adreste bulunamadı',
  NOT_SUCCESS = 'Hatalı teslimat',
}
