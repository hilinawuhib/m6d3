
CREATE TABLE IF NOT EXISTS
products( 
    product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR(100) NOT NULL,
    product_description VARCHAR(100) NOT NULL,
    product_brand VARCHAR (100) NOT NULL,
    image_url VARCHAR (255) DEFAULT 'https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80' NOT NULL,
    product_price NUMERIC NOT NULL,
    product_category VARCHAR(100) NOT NULL, 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS
reviews(
    review_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    comments TEXT NOT NULL,
    rate NUMERIC NOT NULL,
    product_id INTEGER NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
        
);
