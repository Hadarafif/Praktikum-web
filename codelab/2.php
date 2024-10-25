<?php
function segitigaSamaSisiTerbalik($n) {
    for ($i = $n; $i >= 1; $i--) {
        // Cetak spasi
        for ($j = $n; $j > $i; $j--) {
            echo "&nbsp;&nbsp;";
        }

        // Cetak bintang
        for ($k = 1; $k <= (2 * $i - 1); $k++) {
            echo "*";
        }

        echo "<br/>";
    }
}

segitigaSamaSisiTerbalik(5);
?>
