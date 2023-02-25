document.addEventListener('DOMContentLoaded', function () {
    const crossSvg = document.querySelector('#svg-cross');
    
    document.querySelectorAll('#error_explanation li').forEach(function (error) {
        const svg = crossSvg.cloneNode();
        svg.id = ''
        svg.innerHTML = crossSvg.innerHTML;
        error.prepend(svg);
    });
    
    console.log(document.querySelectorAll('#error_explanation li'))
})
