

-- Trigger for user_plan table
DELIMITER $$

CREATE TRIGGER IF NOT EXISTS set_expire_date
BEFORE INSERT ON user_plan
FOR EACH ROW
BEGIN
    DECLARE plan_duration INT;
    SELECT duration INTO plan_duration
    FROM pricing_plan
    WHERE id = NEW.plan_id;

    SET NEW.exp_date = DATE_ADD(NEW.start_date, INTERVAL plan_duration DAY);
END$$

DELIMITER ;

-- Trigger for create user_plan when create user
DELIMITER $$

CREATE TRIGGER  IF NOT EXISTS create_user_plan
AFTER INSERT ON user
FOR EACH ROW
BEGIN
    IF NEW.role = 'user' THEN
        INSERT INTO user_plan (user_id, plan_id)
        VALUES (NEW.id, 1);
    END IF;
END$$

-- Trigger for create sale when create user_purchase
DELIMITER $$

CREATE TRIGGER  IF NOT EXISTS create_sale
AFTER INSERT ON user_purchase
FOR EACH ROW
BEGIN
    DECLARE user_name VARCHAR(50);
    DECLARE plan VARCHAR(50);
    DECLARE amount DECIMAL(10, 2);

    SELECT price INTO amount
    FROM pricing_plan
    WHERE id = NEW.pricing_plan_id;

    SELECT name INTO plan
    FROM pricing_plan
    WHERE id = NEW.pricing_plan_id;

    SELECT username INTO user_name
    FROM user
    WHERE id = NEW.user_id;


    INSERT INTO sale (username, plan, purchase_date, purchase_method, amount)
    VALUES (user_name, plan, NEW.purchase_date, NEW.purchase_method, amount);
END$$

-- Trigger for update user_plan when insert user_purchase
DELIMITER $$

CREATE TRIGGER  IF NOT EXISTS update_user_plan
AFTER INSERT ON user_purchase
FOR EACH ROW
BEGIN
    DELETE FROM user_plan
    WHERE user_id = NEW.user_id;
    
    INSERT INTO user_plan (user_id, plan_id)
    VALUES (NEW.user_id, NEW.pricing_plan_id);
END$$
