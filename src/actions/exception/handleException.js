const handleExceptionMixin = {
  methods: {
    handleApiError(error) {
        let resErrors = error.response.data
            const errors = []
            switch (error.response.status) {
                case 400:
                    
                    this.$refs.form.setErrors(resErrors.Errors)
                    this.MISATinyEmitter.emit(
                        "showNotice",
                        this.$_MISAResource['vn-VI'].Dialog.TitleError,
                        // errors
                        resErrors.Errors
                    )
                    break;
            
                case 500: 
                    errors.push(resErrors.UserMessage)
                    this.MISATinyEmitter.emit(
                        "showNotice",
                        this.$_MISAResource['vn-VI'].Dialog.TitleError,
                        errors
                    )
                    break;
            }
        }
    }
};

export { handleExceptionMixin }