<?php
$options_array = array('default.png');
if(isset($img_url_options_array)){
    $options_array = $img_url_options_array;
}
?>
<h3> New Animal </h3>
<form action='index.php?section=admin' method='POST' class='edit_menu'>
    <label for='apodo'>Apodo:</label>
    <input type='text' name='apodo' value='lucas'>
    <label for='patas'>Número de Patas:</label>
    <input type='number' name='patas' value='4'>
    <label for='color'>Color:</label>
    <input type='color' name='color' value='Black'>
    <label for='activo'>Activo:</label>
    <input type='number' name='activo' value='1'>
    <label for='sonido'>Sonido:</label>
    <input type='text' name='sonido' value='Auuu'>
    <label for='img_url'>Imagen</label>
    <select name="img_url">
        <?php
        foreach ($options_array as $option){
            $selected = "";
            if("client/img/".$option == $img_url || count($options_array) == 1){
                $selected = "selected";
            }
            echo "<option value=".$option." ".$selected.">".$option."</option>";
        }
        ?>
    </select>
    <div class="form_submit_options">
        <button class='icon_title' type='submit' name='action' value='nuevo_animal_form'>Enviar</button>
        <button class='icon_title' type='submit' name='cancel' value='cancel'>Cancelar</button>
    </div>
</form>