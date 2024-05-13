

-- Trigger for user_plan table
DELIMITER //

CREATE TRIGGER IF NOT EXISTS set_expire_date
BEFORE INSERT ON user_plan
FOR EACH ROW
BEGIN
    DECLARE plan_duration INT;
    SELECT duration INTO plan_duration
    FROM pricing_plan
    WHERE id = NEW.plan_id;

    SET NEW.exp_date = DATE_ADD(NEW.start_date, INTERVAL plan_duration DAY);
END//

DELIMITER ;

-- Trigger for create user_plan when create user
DELIMITER //

CREATE TRIGGER  IF NOT EXISTS create_user_plan
AFTER INSERT ON user
FOR EACH ROW
BEGIN
    INSERT INTO user_plan (user_id, plan_id)
    VALUES (NEW.id, 1);
END//