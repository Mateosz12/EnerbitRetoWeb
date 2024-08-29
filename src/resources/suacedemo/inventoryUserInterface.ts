export enum InventoryPage {
    products = '//div[@class = "product_label"]',
    btn_product_backpack = '//div[contains(text(),"Sauce Labs Backpack")]//ancestor::div[@class = "inventory_item"]//child::button[@class = "btn_primary btn_inventory"]',
    btn_product_bikeLight = '//div[contains(text(),"Sauce Labs Bike Light")]//ancestor::div[@class = "inventory_item"]//child::button[@class = "btn_primary btn_inventory"]',
    btn_cart = '.shopping_cart_link',
    
}
