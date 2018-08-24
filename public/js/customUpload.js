(function () {
    const wangE = window.wangEditor;
    const jquery = window.jQuery;
    wangE.createMenu(function (check) {
        const menuId = 'customUpload';
        if (!check(menuId)) {
            return;
        }
        const editor = this;
        const menu = new wangE.Menu({
            editor,
            id: menuId,
            title: '图片',
            $domNormal: jquery('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-picture"></i></a>'),
            $domSelected: jquery('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-picture"></i></a>')
        });
        menu.clickEvent = function () {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/jpg,image/jpeg,image/png';
            fileInput.click();
            jquery(fileInput).on('change', (ev) => {
                const file = ev.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    wangE.config.customUploadChange(this.result, editor);
                };
            });
        };
        editor.menus[menuId] = menu;
    });

})();
