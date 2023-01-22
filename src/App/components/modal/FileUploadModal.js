import React from 'react';
import { Button, Row } from "react-bootstrap";
import Modal from "../Modal";
import './FileUploadModel.scss'
import Config from "../../../config";

class FileUploadModal extends React.Component {
    lang = {
        image: {
            multiple: 'Загрузите несколько изображений в формате .png или .jpg',
            one: 'Загрузите изображение в формате .png или .jpg'
        }
    }

    lang2 = {
        image: 'Поддерживаются только файлы в формате .png и .jpg',
    }

    extensions = {
        image: ['.png', '.jpg', '.jpeg']
    }

    /*
      current: string
      uploadType: 'icons'
      active: boolean
      ext: 'image' | 'any'
      count: 'one' | 'multi'
      onUploaded: (event: File) => {}
      onCanceled: (event) => {}
     */
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            errored: false
        }

        this.errorUp = this.errorUp.bind(this);
        this.onDropEvent = this.onDropEvent.bind(this);
        this.uploadData = this.uploadData.bind(this);
    }

    errorUp(bool) {
        this.setState({
            errored: bool
        })
    }

    async uploadData() {
        const data = new FormData();
        data.append('file', this.state.files[0]);

        const result = await fetch(Config.api_link + 'control/upload?type='
            + this.props.uploadType
            + (this.props.current
                ? '&old=' + this.props.current
                : ''),

            {
                method: 'POST',
                body: data,
                headers: {
                    Authorization: window.localStorage.getItem('token')
                }
            }
        );

        const res = await result.text();
        alert(res);

        this.props.onUploaded({ path: JSON.parse(res).path });
    }

    onDropEvent(e) {
        e.stopPropagation();
        e.preventDefault();
        const files = e.dataTransfer.files; // Array of all files

        if (this.props.count === 'one') {
            let ok = false;

            for (const ext of this.extensions[this.props.ext]) {
                if (files[0].name.endsWith(ext)) {
                    ok = true;
                }
            }

            if (!ok) {
                this.errorUp(true);
                this.setState({ files: [] })
                return;
            }
        } else {
            for (const f of files) {
                let ok = false;

                for (const ext of this.extensions[this.props.ext]) {
                    if (f.name.endsWith(ext)) {
                        ok = true;
                    }
                }

                if (!ok) {
                    this.errorUp(true);
                    this.setState({ files: [] })
                    return;
                }
            }
        }

        this.setState({
            files
        });

        this.errorUp(false);

        //alert(JSON.stringify(files))
    }

    onDragOverEvent(e) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    render() {
        return <Modal active={this.props.active} setActive={this.props.onCanceled}>
            <h4 className='font-weight-bold'>
                <i className='feather icon-upload-cloud' style={{ color: '#5b8be3' }}/> Загрузка файла на сервер
            </h4>

            <h5>{ this.lang[this.props.ext][this.props.count] }</h5>

            <hr style={{ marginBottom: '20px' }}/>

            <div className='fileUploadModal fileUpload' style={this.state.files.length > 0 ? { height: 'auto' } : {}} onDrop={this.onDropEvent} onDragOver={this.onDragOverEvent}>
                {
                    (() => {
                        if (this.state.files.length === 0) {
                            return [
                                <svg className={'icon ' + (this.state.errored ? 'errored' : '')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M8.71,7.71,11,5.41V15a1,1,0,0,0,2,0V5.41l2.29,2.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42l-4-4a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-4,4A1,1,0,1,0,8.71,7.71ZM21,12a1,1,0,0,0-1,1v6a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V13a1,1,0,0,0-2,0v6a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12Z"/>
                                </svg>,
                                <>{this.state.errored ? this.lang2[this.props.ext] : 'Выберите файл или перетащите его сюда'}</>
                            ]
                        }

                        return [

                            // <svg className='icon done' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550.801 550.801">
                            //     <g>
                            //         <path d="M488.426,197.019H475.2v-63.816c0-0.401-0.063-0.799-0.116-1.205c-0.021-2.534-0.827-5.023-2.562-6.992L366.325,3.691   c-0.032-0.031-0.063-0.042-0.085-0.073c-0.633-0.707-1.371-1.298-2.151-1.804c-0.231-0.158-0.464-0.287-0.706-0.422   c-0.676-0.366-1.393-0.675-2.131-0.896c-0.2-0.053-0.38-0.135-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2   c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.87v160.542   c0,17.044,13.824,30.876,30.873,30.876h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601   V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87V227.89C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605   h250.193v110.51c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M328.43,386.771h-39.244l-12.44-41.402h-46.185   l-11.496,41.402h-37.811l49.307-161.289h47.849L328.43,386.771z M78.599,385.573l4.081-29.432   c5.023,1.672,11.476,2.864,18.658,2.864c15.314,0,24.888-6.94,24.888-32.062V225.482h36.365v101.941   c0,45.947-22.021,61.968-57.43,61.968C96.792,389.391,85.781,387.967,78.599,385.573z M453.601,523.353H97.2V419.302h356.4V523.353   z M434.447,386.771c-2.626-4.541-6.455-17.709-11.243-37.573c-4.313-20.103-11.243-25.608-26.082-25.84h-11.001v63.413h-36.133   V227.636c11.728-1.912,29.183-3.349,48.568-3.349c23.931,0,40.679,3.586,52.175,12.685c9.561,7.657,14.829,18.905,14.829,33.734   c0,20.588-14.597,34.704-28.477,39.73v0.717c11.243,4.54,17.477,15.304,21.537,30.148c5.03,18.188,10.046,39.25,13.151,45.468   H434.447z"/>
                            //         <path d="M402.627,251.338c-8.864,0-13.879,0.712-16.506,1.191v44.508h14.339c18.193,0,28.956-9.097,28.956-23.214   C429.427,258.984,419.376,251.569,402.627,251.338z"/>
                            //         <path d="M261.426,283.869c-2.866-9.565-5.74-21.536-8.132-31.107h-0.475c-2.394,9.571-4.801,21.773-7.414,31.107l-9.585,34.215   h35.662L261.426,283.869z"/>
                            //     </g>
                            // </svg>,
                            <img src={URL.createObjectURL(this.state.files[0])} style={{ pointerEvents: 'none', userSelect: 'none', maxWidth: '500px', maxHeight: '250px', borderRadius: '8pxew' }} alt="your image" />,

                            <div style={{ marginTop: '-20px', color: '#fff', textShadow: '#000 2px 0 15px', left: '50%',
                                transform: 'translate(-50%, -50%)', position: 'fixed' }}>{this.state.files[0].name}</div>
                        ]
                    })()
                }

            </div>

            <Row className='mt-4' style={{marginLeft:'1px'}}>
                <Button className={this.state.files.length === 0 ? 'but-disabled' : 'but-ok'} onClick={this.uploadData}>Готово</Button>
                <Button className='but-cancel' onClick={this.props.onCanceled}>Отмена</Button>
            </Row>
        </Modal>;
    }
}

export default FileUploadModal;
