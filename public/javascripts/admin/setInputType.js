let set = {
    radioInput: document.querySelectorAll('input[name = "filetype"]'),
    file: document.getElementById('file'),
    setInputType: function () {
        let c = this;
        c.radioInput.forEach(e =>
            e.addEventListener('change', function () {
                c.file.setAttribute('accept', `.${this.value}`);
            })
        );
    },
};

set.setInputType();
