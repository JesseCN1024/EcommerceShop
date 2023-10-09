module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shop</title>
        
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
        <link href="/css/main.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
      </head>

      <body>
        <header>
            <!-- Nav 1 -->
          <nav class="navbar navbar-expand-lg bg-success">
            <div class="container-lg">
              <div class="">
                <ul class="d-flex list-unstyled">
                  <li >
                    <a class="text-white fs-5 mx-2 text-decoration-none" href=""><i class="fa fa-phone"></i>+1 555 987 6543</a>
                  </li>
                  <li>
                    <a class="text-white fs-5 mx-2 text-decoration-none" href=""><i class="fa fa-envelope"></i> shop@myshop.com</a>
                  </li>
                </ul>
              </div>
              <div>
                <ul class="d-flex list-unstyled">
                  <li><a class="text-white fs-4 mx-2" href=""><i class="fab fa-facebook"></i></a></li>
                  <li><a class="text-white fs-4 mx-2" href=""><i class="fab fa-twitter"></i></a></li>
                  <li><a class="text-white fs-4 mx-2" href=""><i class="fab fa-linkedin"></i></a></li>
                  <li><a class="text-white fs-4 mx-2" href=""><i class="fab fa-dribbble"></i></a></li>
                  <li><a class="text-white fs-4 mx-2" href=""><i class="fab fa-google-plus"></i></a></li>
                </ul>
              </div>
            </div>
          </nav>
          <!-- Nav 2 -->
          <nav class="navbar ">
            <div class="container-lg d-flex align-items-center">
              <div>
                <a class="text-decoration-none" href="/">
                  <h2 class="text-decoration-none text-success">EComm Shop</h3>
                </a>
              </div>
              <div class="navbar-item ">
                <div class="navbar-buttons d-flex ">
                  <div class="navbar-item ">
                    <a class="text-decoration-none text-success mx-2 fs-5" href="/"><i class="fa fa-star"></i> Products</a>
                  </div>
                  <div class="navbar-item">
                    <a class="text-decoration-none text-success mx-2 fs-5" href="/cart"><i class="fa fa-shopping-cart"></i> Cart</a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <!-- START CONTENT:  -->
        ${content}
        <footer class="bg-success text-center p-3 text-white mt-5 fs-5">
            <p>Copyrights by JesseCN Corp@. All rights reserved </p>
        </footer>
      </body>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    </html>
  `;
};
