<?php

class Usuario{
    public $id;
    public $nombre;

    public function __construct($id, $nombre){
        $this->id = $id;
        $this->nombre = $nombre;
    }
}

?>