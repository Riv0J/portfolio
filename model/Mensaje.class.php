<?php

class Mensaje{
    //atributos
    public $texto;
    public $icon_name;

    //constructor<
    public function __construct($texto, $icon_name='error'){
        $this->texto = $texto;
        $this->icon_name = $icon_name;
    }
}

?>