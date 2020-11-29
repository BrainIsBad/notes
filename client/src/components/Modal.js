import React, {useState, useRef} from 'react'
import axios from 'axios'
import {useModal} from "../context/ModalContext";

export default function Modal() {
    const {visible, toggle} = useModal()
    const initialForm = {
        title: '',
        text: '',
        img: ''
    }
    const [form, setForm] = useState(initialForm)

    const inputImage = useRef(null)

    const [errors, setErrors] = useState({
        title: null,
        text: null
    })

    const hide = () => {
        setForm(initialForm)
        setImage(null)
        toggle()
    }

    const [image, setImage] = useState(null)

    const validateForm = () => {
        const newErrors = {}
        Object.keys(form).forEach(key => {
            if (form[key].trim() === '' && key !== 'img') {
                newErrors[key] = `Enter "${key}"!`
            }
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    if (!visible) return null

    const overlayClickHandler = e => {
        if (e.target.classList.contains('modal-overlay')) {
            hide()
        }
    }

    const textInputChangeHandler = e => {
        setForm(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const fileInputChangeHandler = e => {
        setForm(prev => ({...prev, img: e.target.value}))

        const reader = new FileReader()

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            reader.onloadend = readerEvent => {
                setImage(readerEvent.target.result)
            }
        }
    }

    const submitHandler = e => {
        e.preventDefault()

        if (validateForm()) {
            const formData = new FormData()

            Object.keys(form).forEach(key => {
                if (key !== 'img') {
                    formData.append(key, form[key])
                }

                if (key === 'img' && image) {
                    formData.append('image', inputImage.current.files[0])
                }
            })
            axios.post('/api/notes/create', formData, {
                'Content-Type': 'multipart/form-data'
            }).then(response => {
                if (response.data.note) {
                    hide()
                }
            }).catch(e => {
                console.log(e.message)
            })
        }
    }

    const deleteImageHandler = () => {
        setImage(null)
        setForm(prev => ({...prev, img: ''}))
    }

    return (
        <div className={'modal-overlay'} onClick={overlayClickHandler}>
            <div className="modal">
                <div className="modal-header">
                    Create note
                </div>
                <div className="modal-content">
                    <form id={'modal-form'} onSubmit={submitHandler}>
                        <div className="form-group">
                            { errors.title && <small className={'text-danger d-block'}>{errors.title}</small> }
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className={'form-control'}
                                name={'title'}
                                id={'title'}
                                onChange={textInputChangeHandler}
                                value={form.title}
                            />
                        </div>
                        <div className="form-group">
                            { errors.text && <small className={'text-danger d-block'}>{errors.text}</small> }
                            <label htmlFor="text">Text</label>
                            <textarea
                                className={'form-control'}
                                name={'text'}
                                id={'text'}
                                onChange={textInputChangeHandler}
                                rows={5}
                                value={form.text}
                            />
                        </div>
                        <div className="form-group">
                            { image && <img src={image} className={'w-100 mb-1'} alt={'image'} /> }
                            { image && <button className={'btn btn-danger form-control mb-1'} onClick={deleteImageHandler}>Delete image</button> }
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    id="image"
                                    aria-describedby="image"
                                    accept={'image/*'}
                                    onChange={fileInputChangeHandler}
                                    ref={inputImage}
                                />
                                <label
                                    className="custom-file-label"
                                    htmlFor="image"
                                >
                                    {form.img}
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-danger mr-1" onClick={hide}>Cancel</button>
                    <button className="btn btn-success" form={'modal-form'} type={'submit'}>Create</button>
                </div>
            </div>
        </div>
    )
}