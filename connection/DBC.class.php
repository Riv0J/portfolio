<?php
    require_once "model/Animal.class.php";
    require_once "model/Usuario.class.php";
    class DBC{
        const HOST="localhost";
        const BD="portfolio";
        const USER="sanluis";
        const PASS="sanluis";

        public $conexion;
        
        function __construct(){
            $this->conectar();
        }

        public function conectar() {
            $this->conexion = mysqli_connect(self::HOST, self::USER, self::PASS, self::BD);
            if (!$this->conexion) {
                die("Error al ejecutar: " . mysqli_connect_error());
                return false; // Indicar que la conexión falló
            }
            return true;
        }
        function desconectar(){
            mysqli_close($this->conexion);
        }
        function sql_query($sql_select_query){
            //inferir el tipo de de sql_query
            $tipoSQL = strtoupper(substr($sql_select_query,0,6));
            $result=mysqli_query($this->conexion,$sql_select_query);
            if ($tipoSQL==="SELECT") {
                return $result;
            } else {
                //si la consulta de insert, update, delete entonces devuelve true/false
                return $result;
            }
        }
        function validarCredenciales($nombre, $pass){
            $result=$this->sql_query("SELECT * from usuarios WHERE nombre = '".$nombre."' and pass = md5('".$pass."');");
            $fila = mysqli_fetch_array($result);
            if($fila != null){
                extract($fila);
                return new Usuario($id,$nombre);
            }
            return null;
        }
        public static function getNewConnection() {
            $dbc = new DBC();
            $conexion_exitosa = $dbc->conectar();
            if ($conexion_exitosa === true) { // Verificar si la conexión se estableció correctamente
                return $dbc;
            } else {
                return null;
            }
        }
    }
?>