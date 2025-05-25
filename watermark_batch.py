from PIL import Image, ImageDraw, ImageFont
import os

def add_watermark_with_logo(input_folder, output_folder, text, logo_path, scale_percent=10):
    # Загружаем логотип
    logo = Image.open(logo_path).convert("RGBA")

    # Проверяем/создаём выходную папку
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(input_folder):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)

            print(f"Обработка файла: {filename}")

            # Открываем основное изображение
            image = Image.open(input_path).convert("RGBA")

            # ✅ Наносим текстовый вотермарк
            txt_layer = Image.new("RGBA", image.size, (255,255,255,0))
            draw = ImageDraw.Draw(txt_layer)

            font_size = image.width // 30
            font = ImageFont.truetype("arial.ttf", font_size)
            text_width, text_height = draw.textsize(text, font=font)

            x_text = image.width - text_width - 10
            y_text = image.height - text_height - 10

            draw.text((x_text, y_text), text, font=font, fill=(255, 255, 255, 180))

            image_with_text = Image.alpha_composite(image, txt_layer)

            # ✅ Наносим логотип
            logo_width = int(image.width * scale_percent / 100)
            aspect_ratio = logo.height / logo.width
            logo_height = int(logo_width * aspect_ratio)
            logo_resized = logo.resize((logo_width, logo_height), Image.LANCZOS)

            x_logo = image.width - logo_width - 10
            y_logo = image.height - logo_height - 10

            transparent = Image.new("RGBA", image.size, (0,0,0,0))
            transparent.paste(logo_resized, (x_logo, y_logo), mask=logo_resized)

            final_image = Image.alpha_composite(image_with_text, transparent)

            # Сохраняем итоговый результат
            final_image.convert("RGB").save(output_path)
            print(f"Водяной знак (текст+логотип) добавлен: {output_path}")

if __name__ == "__main__":
    # Параметры
    input_folder = "images"  # исходная папка
    output_folder = "output" # выходная папка
    text = "© Ваш текст"     # текст вотермарка
    logo_path = "logo.png"   # путь к логотипу (PNG с прозрачностью)

    add_watermark_with_logo(input_folder, output_folder, text, logo_path, scale_percent=10)
