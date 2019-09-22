import Glide from '@glidejs/glide';

let glide = new Glide('.glide', {
    type: 'carousel',
    bound: true,
    perView: 2,
    focusAt: 'center',
    startAt: 0,
    gap: 16,
    peek: {
        before: 313.500,
        after: 313.500,
    },
    breakpoints: {
        1439: {
            type: 'slider',
            perView: 3,
            startAt: 0,
            focusAt: 0,
            gap: 8,
            bound: true,
            peek: {
                before: 40,
                after: 100,
            },
        },
        1360: {
            type: 'slider',
            perView: 3,
            startAt: 0,
            focusAt: 0,
            gap: 8,
            bound: true,
            peek: {
                before: 40,
                after: 100,
            },
        },
        1330: {
            type: 'slider',
            perView: 3,
            startAt: 0,
            focusAt: 0,
            gap: 8,
            bound: true,
            peek: {
                before: 40,
                after: 100,
            },
        },
        1200: {
            type: 'slider',
            perView: 3,
            startAt: 0,
            focusAt: 0,
            gap: 8,
            bound: true,
            peek: {
                before: 40,
                after: 40,
            },
        },
        1110: {
            type: 'slider',
            perView: 2,
            startAt: 0,
            focusAt: 0,
            gap: 8,
            bound: true,
            peek: {
                before: 40,
                after: 40,
            },
        },
        768: {
            type: 'slider',
            perView: 2,
            startAt: 0,
            focusAt: 0,
            gap: 8,
            bound: true,
            peek: {
                before: 16,
                after: 16,
            },
        },
        768: {
            type: 'slider',
            perView: 2,
            startAt: 0,
            focusAt: 0,
            gap: 8,
            bound: true,
            peek: {
                before: 16,
                after: 16,
            },
        },
        615: {
            type: 'slider',
            perView: 1,
            startAt: 0,
            focusAt: 0,
            gap: 8,
            bound: true,
            peek: {
                before: 16,
                after: 16,
            },
        },
    }
});

glide.mount();