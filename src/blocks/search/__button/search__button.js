export default function ButtonState() {
    function active(btn) {
        btn.removeAttribute('disabled');
        btn.style.cursor = 'pointer';
        btn.style.pointerEvents = 'auto';
        btn.style.opacity = '1';
    }

    function deactive(btn) {
        btn.setAttribute('disabled', true);
        btn.style.cursor = 'default';
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.2';
    }

    return {
        active,
        deactive
    }
};