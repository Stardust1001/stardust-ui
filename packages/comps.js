import xactionsheet from './components/xactionsheet/xactionsheet.vue'
import xautorows from './components/xautorows/xautorows.vue'
import mobilexbutton from './components/xbutton/mobile.vue'
import pcxbutton from './components/xbutton/pc.vue'
import xchart from './components/xchart/xchart.vue'
import mobilexcheckboxs from './components/xcheckboxs/mobile.vue'
import pcxcheckboxs from './components/xcheckboxs/pc.vue'
import mobilexcol from './components/xcol/mobile.vue'
import pcxcol from './components/xcol/pc.vue'
import mobilexdialog from './components/xdialog/mobile.vue'
import pcxdialog from './components/xdialog/pc.vue'
import xdistrictselect from './components/xdistrictselect/xdistrictselect.vue'
import mobilexform from './components/xform/mobile.vue'
import pcxform from './components/xform/pc.vue'
import mobilexformitem from './components/xformitem/mobile.vue'
import pcxformitem from './components/xformitem/pc.vue'
import mobilexicon from './components/xicon/mobile.vue'
import pcxicon from './components/xicon/pc.vue'
import xinfo from './components/xinfo/xinfo.vue'
import xlooper from './components/xlooper/xlooper.vue'
import mobilexpagination from './components/xpagination/mobile.vue'
import pcxpagination from './components/xpagination/pc.vue'
import xpicker from './components/xpicker/xpicker.vue'
import mobilexradios from './components/xradios/mobile.vue'
import pcxradios from './components/xradios/pc.vue'
import mobilexrow from './components/xrow/mobile.vue'
import pcxrow from './components/xrow/pc.vue'
import mobilexselect from './components/xselect/mobile.vue'
import pcxselect from './components/xselect/pc.vue'
import mobilextable from './components/xtable/mobile.vue'
import pcxtable from './components/xtable/pc.vue'
import mobilextabletools from './components/xtabletools/mobile.vue'
import pcxtabletools from './components/xtabletools/pc.vue'
import xtablev2 from './components/xtablev2/xtablev2.vue'
import xtableviewer from './components/xtableviewer/xtableviewer.vue'
import xtinymce from './components/xtinymce/xtinymce.vue'
import xfileuploader from './components/xuploader/xfileuploader.vue'
import ximageuploader from './components/xuploader/ximageuploader.vue'

const modules = {
  xactionsheet,
  xautorows,
  mobilexbutton,
  pcxbutton,
  xchart,
  mobilexcheckboxs,
  pcxcheckboxs,
  mobilexcol,
  pcxcol,
  mobilexdialog,
  pcxdialog,
  xdistrictselect,
  mobilexform,
  pcxform,
  mobilexformitem,
  pcxformitem,
  mobilexicon,
  pcxicon,
  xinfo,
  xlooper,
  mobilexpagination,
  pcxpagination,
  xpicker,
  mobilexradios,
  pcxradios,
  mobilexrow,
  pcxrow,
  mobilexselect,
  pcxselect,
  mobilextable,
  pcxtable,
  mobilextabletools,
  pcxtabletools,
  xtablev2,
  xtableviewer,
  xtinymce,
  xfileuploader,
  ximageuploader
}

const comps = {}
for (let key in modules) {
  comps[modules[key].name] = modules[key]
}

export default comps
