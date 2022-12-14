var pos = 0;
    const pacArray = [
        ['PacMan1.png', 'PacMan2.png'],
        ['PacMan3.png', 'PacMan4.png']
    ];
    var direction = 0;
    const pacMen = [];

    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: Math.random() * scale
        }
    }
    // Factory to make a PacMan 
    function makePac() {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setToRandom(20); // {x:?, y:?}
        let position = {x: '', y: ''};
        // Add image to div id = game
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.imgIndex = 1;
        newimg.style.position = 'absolute';
        newimg.src = 'PacMan1.png';
        newimg.width = 100;
        newimg.height = 105.73;
        position.x = Math.random() * game.offsetWidth;
        position.y = Math.random() * game.offsetHeight;
        //
        // set position here 
        // 
        if(position.x > game.offsetWidth - newimg.width) 
            position.x = position.x - newimg.width;
        if(position.y > game.offsetHeight - newimg.height) 
            position.y = position.y - newimg.height;

        newimg.style.left = position.x;
        newimg.style.top = position.y;

        // add new Child image to game
        game.appendChild( newimg );
        // return details in an object
        return {
            position,
            velocity,
            newimg
        }
    }


    function update() {
        //loop over pacmen array and move each one and move image in DOM
        pacMen.forEach((item) => {
            checkCollisions(item)
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x;
            item.newimg.style.top = item.position.y;
            animatePacman(item);
        })
        setTimeout(update, 20);
    }

    function checkCollisions(item) {
        if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth)
        {
            item.velocity.x = -item.velocity.x;
            item.newimg.imgIndex  = 3;
        }
        if (item.position.x + item.velocity.x < 0)
        {
            item.velocity.x = -item.velocity.x;
            item.newimg.imgIndex  = 1;
        }
        if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
            item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;
    }

    function makeOne() {
        pacMen.push(makePac()); // add a new PacMan
    }
    
    function animatePacman(item)
    {
        if(item.newimg.imgIndex === 1)
        {
            item.newimg.src = 'PacMan2.png'
            item.newimg.imgIndex = 2
        }
        else if(item.newimg.imgIndex === 2)
        {
            item.newimg.src = 'PacMan1.png'
            item.newimg.imgIndex = 1
        }
        else if(item.newimg.imgIndex === 3)
        {
            item.newimg.src = 'PacMan4.png'
            item.newimg.imgIndex = 4
        }
        else if(item.newimg.imgIndex === 4)
        {
            item.newimg.src = 'PacMan3.png'
            item.newimg.imgIndex = 3
        }
    }