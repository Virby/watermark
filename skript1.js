 <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let mainImage = new Image();
    let logoImage = new Image();
    let mainImageLoaded = false;
    let logoImageLoaded = false;

    document.getElementById('mainImageInput').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(event) {
        mainImage.onload = () => {
          mainImageLoaded = true;
          drawMainImage();
        };
        mainImage.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });

    document.getElementById('logoInput').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(event) {
        logoImage.onload = () => {
          logoImageLoaded = true;
        };
        logoImage.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });

    function drawMainImage() {
      if (!mainImageLoaded) return;
      canvas.width = mainImage.width;
      canvas.height = mainImage.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(mainImage, 0, 0);
    }

    function addLogoWatermark() {
      if (!mainImageLoaded || !logoImageLoaded) {
        alert('Загрузите и изображение, и логотип.');
        return;
      }
      drawMainImage(); // перерисовать фон

      const scalePercent = parseFloat(document.getElementById('scaleInput').value) || 10;
      const logoWidth = canvas.width * (scalePercent / 100);
      const aspectRatio = logoImage.height / logoImage.width;
      const logoHeight = logoWidth * aspectRatio;

      const x = canvas.width - logoWidth - 10;
      const y = canvas.height - logoHeight - 10;

      ctx.globalAlpha = 0.8; // прозрачность логотипа
      ctx.drawImage(logoImage, x, y, logoWidth, logoHeight);
      ctx.globalAlpha = 1.0;
    }

    function downloadImage() {
      const link = document.createElement('a');
      link.download = 'image_with_logo.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  </script>