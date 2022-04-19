
export function textAreaAutoSizing() {
    $(document).on('keydown keyup',"textarea.autosize", function () {
        $(this).height(1).height( $(this).prop('scrollHeight')+12 );	
    });
};