const crossSvg = document.querySelector('#svg-cross');

document.querySelectorAll('#error_explanation li').forEach(function (error) {
    error.prepend(crossSvg.cloneNode());
});

console.log(document.querySelectorAll('#error_explanation li'))