<?php

class Animal{
    //atributos
    public $id;
    public $apodo;
    public $color;
    public $patas;
    public $sonido;
    public $img_url;
    public $activo;
    public $nombre_usuario;
    //constructor<
    public function __construct($id, $apodo, $color,$patas, $sonido, $img_url, $activo, $nombre_usuario){
        $this->id = $id;
        $this->apodo = $apodo;
        $this->color = $color;
        $this->patas = $patas;
        $this->sonido = $sonido;
        $this->img_url = $img_url;
        $this->activo = $activo;
        $this->nombre_usuario = $nombre_usuario;

    }

}

?>