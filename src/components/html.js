function getReusableHTML(mainContent) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta description="Name my cat website">
    <link rel="stylesheet" href="/style.css">
    <title>Name my Kitty</title>
</head>
<body>
    <header class='logo'>
        <img src='/images/logoweek7.png' alt="name-my-kitty-logo"/>
    </header>
    <main>
        ${mainContent}
    </main>
</body>
</html>
`;
}

module.exports = { getReusableHTML };