<!-- <template>
  <div class="demo-page-wrapper">
    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #toolbarButtons>
        <vxe-select
          v-model="selectRowSize"
          :options="dataOptions"
          @change="changeRowSizeEvent"
        ></vxe-select>
        <vxe-button status="primary" icon="vxe-icon-add" @click="addEvent"
          >新增</vxe-button
        >
        <vxe-button
          status="error"
          icon="vxe-icon-no-drop"
          @click="pendingSelect(true)"
          >标记删除</vxe-button
        >
        <vxe-button
          status="error"
          icon="vxe-icon-no-drop"
          @click="pendingSelect(false)"
          >取消标记</vxe-button
        >
        <vxe-button status="success" icon="vxe-icon-save" @click="saveEvent"
          >保存</vxe-button
        >
      </template>

      <template #active="{ row }">
        <vxe-button
          mode="text"
          status="error"
          icon="vxe-icon-delete"
          @click="removeRow(row)"
        ></vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { VxeUI } from 'vxe-pc-ui'
import { goods } from '@/service'
const gridRef = ref()
const selectRowSize = ref(10)
//表格
const avatarUrlCellRender = reactive({
  name: 'VxeUpload',
  props: {
    mode: 'image',
    singleMode: true,
    urlMode: true,
    showButtonText: false,
    pasteToUpload: true,
    autoHiddenButton: true,
    progressText: '{percent}%',
    imageConfig: {
      width: 80,
      height: 80,
    },
    uploadMethod({ file, updateProgress }) {
      const formData = new FormData()
      formData.append('file', file)
      return axios
        .post('/api/pub/upload/single', formData, {
          // 显示进度
          onUploadProgress(progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 0)
            )
            updateProgress(percentCompleted)
          },
        })
        .then(res => {
          // { url: ''}
          return {
            ...res.data,
          }
        })
    },
  },
})
const imgListCellRender = reactive({
  name: 'VxeUpload',
  props: {
    mode: 'image',
    multiple: true,
    urlMode: true,
    showButtonText: false,
    pasteToUpload: true,
    dragSort: true,
    progressText: '{percent}%',
    moreConfig: {
      maxCount: 1,
    },
    imageConfig: {
      width: 80,
      height: 80,
    },
    uploadMethod({ file, updateProgress }) {
      const formData = new FormData()
      formData.append('file', file)
      return axios
        .post('/api/pub/upload/single', formData, {
          // 显示进度
          onUploadProgress(progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 0)
            )
            updateProgress(percentCompleted)
          },
        })
        .then(res => {
          // { url: ''}
          return {
            ...res.data,
          }
        })
    },
  },
})
const fileListCellRender = reactive({
  name: 'VxeUpload',
  props: {
    multiple: true,
    urlMode: true,
    showButtonText: false,
    pasteToUpload: true,
    dragSort: true,
    progressText: '{percent}%',
    moreConfig: {
      maxCount: 1,
      layout: 'horizontal',
    },
    uploadMethod({ file, updateProgress }) {
      const formData = new FormData()
      formData.append('file', file)
      return axios
        .post('/api/pub/upload/single', formData, {
          // 显示进度
          onUploadProgress(progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 0)
            )
            updateProgress(percentCompleted)
          },
        })
        .then(res => {
          // { url: ''}
          return {
            ...res.data,
          }
        })
    },
  },
})
const dataOptions = ref([
  { label: '加载 3 行', value: 3 },
  { label: '加载 10 行', value: 10 },
  { label: '加载 20 行', value: 20 },
  { label: '加载 100 行', value: 100 },
])
const flag1CellRender = reactive({
  name: 'VxeSwitch',
  props: { value: true },
})
const cityEditRender = reactive({
  name: 'VxeSelect',
  options: [
    { label: '深圳市', value: 'sz' },
    { label: '广州市', value: 'gz' },
    { label: '北京市', value: 'bj' },
    { label: '上海市', value: 'sh' },
    { label: '杭州市', value: 'hz' },
    { label: '石家庄市', value: 'sjz' },
    { label: '唐山市', value: 'ts' },
    { label: '天津市', value: 'tj' },
  ],
})
const gridOptions = reactive({
  border: true,
  loading: false,
  stripe: true,
  showOverflow: true,
  keepSource: true,
  height: '100%',
  columnConfig: {
    resizable: true,
  },
  rowConfig: {
    useKey: true,
    isHover: true,
    height: 150,
  },
  toolbarConfig: {
    custom: true,
    slots: {
      buttons: 'toolbarButtons',
    },
  },
  checkboxConfig: {
    range: true,
  },
  editConfig: {
    mode: 'cell',
    trigger: 'dblclick',
    showStatus: true,
  },
  mouseConfig: {
    selected: true,
  },
  keyboardConfig: {
    isEdit: true,
    isArrow: true,
    isEnter: true,
    isBack: true,
    isDel: true,
    isEsc: true,
  },
  scrollX: {
    gt: 0,
    enabled: true,
  },
  scrollY: {
    gt: 0,
    mode: 'wheel',
    enabled: true,
  },
  editRules: {
    name: [{ required: true, content: '请输入名字' }],
  },
  columns: [
    { field: 'seq', type: 'seq', fixed: 'left', width: 60 },
    { field: 'checkbox', type: 'checkbox', fixed: 'left', width: 60 },
    {
      field: 'name',
      title: '商品名称',
      minWidth: 150,
      dragSort: true,
      editRender: { name: 'VxeInput' },
    },
    {
      title: '基本信息',
      field: 'info',
      children: [
        {
          field: 'images',
          title: '商品图片',
          width:100,
          height:100,
          cellRender: avatarUrlCellRender,
        },
        {
          field: 'description',
          title: '描述',
          width: 140,
          editRender: { name: 'VxeInput' },
        },
        {
          field: 'city',
          title: '生产地',
          width: 140,
          editRender: cityEditRender,
        },
        {
          field: 'count',
          title: '数量',
          width: 140,
          editRender: { name: 'VxeNumberInput', props: { type: 'number' } },
        },
        {
          field: 'price',
          title: '价格',
          width: 120,
          editRender: { name: 'VxeNumberInput', props: { type: 'float' } },
        },
        {
          field: 'production',
          title: '厂商',
          width: 150,
          editRender: { name: 'VxeInput' },
        },
      ],
    },
    {
      field: 'flag',
      title: '是否上架',
      width: 140,
      cellRender: flag1CellRender,
    },
    {
      field: 'active',
      title: '操作',
      fixed: 'right',
      width: 80,
      slots: { default: 'active' },
    },
  ],
})

//查找
const loadDataForm = async rSize => {
  gridOptions.loading = true
  try {
    const response = await goods.list({ pageNo: 1, pageSize: rSize })
    const data = response.data.data || []
    if (Array.isArray(data)) {
      const $grid = gridRef.value
      if ($grid) {
        $grid.reloadData(data)
      }
    } else {
      console.error('返回的数据格式错误，应为一个数组', response)
      VxeUI.modal.message({
        content: '数据格式错误，无法加载',
        status: 'error',
      })
    }
  } catch (error) {
    console.error('数据加载失败:', error)
    VxeUI.modal.message({
      content: '加载数据失败',
      status: 'error',
    })
  } finally {
    gridOptions.loading = false
  }
}
//更改加载行数
const changeRowSizeEvent = () => {
  loadDataForm(selectRowSize.value)
}
//增加空白行
const addEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const record = {
      name: '',
      description: '',
      price: '',
      city: '',
      flag: false,
      count: '',
    }
    const { row: newRow } = await $grid.insertAt(record, null)
    $grid.setPendingRow(newRow)
  }
}
//选中数据
const pendingSelect = async checked => {
  const $grid = gridRef.value
  if ($grid) {
    const selectRecords = $grid.getCheckboxRecords()
    if (selectRecords.length) {
      $grid.setPendingRow(selectRecords, checked)
      $grid.clearCheckboxRow()
    } else {
      VxeUI.modal.message({
        content: '未选中数据',
        status: 'info',
      })
    }
  }
}
//移出一行
const removeRow = async row => {
  try {
    const { _id } = row
    await goods.deletes(_id)
    gridRef.value.remove(row)
    VxeUI.modal.message({ content: '删除成功', status: 'success' })
    loadDataForm(selectRowSize.value)
  } catch (error) {
    console.error('删除失败:', error)
    VxeUI.modal.message({ content: '删除失败', status: 'error' })
  }
}
//保存，(修改，添加)
const saveEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const errMap = await $grid.validate(true)
    if (errMap) {
      return
    }
    const { insertRecords, updateRecords, removeRecords } = $grid.getRecordset()
    const pendingRecords = $grid.getPendingRecords()
    try {
      await Promise.all([
        ...insertRecords.map(record => goods.add(record)),
        ...updateRecords.map(record => goods.update(record)),
      ])
      VxeUI.modal.alert({
        title: '商品管理器',
        content: `新增：${insertRecords.length} 行，已删除：${removeRecords.length} 行，待删除：${pendingRecords.length} 行，修改：${updateRecords.length} 行`,
      })
      loadDataForm(selectRowSize.value)
    } catch (error) {
      console.error('保存失败', error)
      VxeUI.modal.message({
        content: '保存失败',
        status: 'error',
      })
    }
  }
}

nextTick(() => {
  loadDataForm(selectRowSize.value)
})
</script>
<style lang="scss" scoped>
@import url(./index.scss);
</style> -->
<template>
  <div class="demo-page-wrapper">
    <vxe-grid ref="gridRef" v-bind="gridOptions">
      <template #toolbarButtons>
        <vxe-select
          v-model="selectRowSize"
          :options="dataOptions"
          @change="changeRowSizeEvent"
        ></vxe-select>
        <vxe-button status="primary" icon="vxe-icon-add" @click="addEvent"
          >新增</vxe-button
        >
        <vxe-button
          status="error"
          icon="vxe-icon-no-drop"
          @click="pendingSelect(true)"
          >标记删除</vxe-button
        >
        <vxe-button
          status="error"
          icon="vxe-icon-no-drop"
          @click="pendingSelect(false)"
          >取消标记</vxe-button
        >
        <vxe-button status="success" icon="vxe-icon-save" @click="saveEvent"
          >保存</vxe-button
        >
      </template>

      <template #active="{ row }">
        <vxe-button
          mode="text"
          status="error"
          icon="vxe-icon-delete"
          @click="removeRow(row)"
        ></vxe-button>
      </template>
    </vxe-grid>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import { VxeUI } from 'vxe-pc-ui'
import { goods } from '@/service'
import axios from 'axios'

const gridRef = ref()
const selectRowSize = ref(10)
//表格

// 定义 VxeUpload 的配置
const imgListCellRender = reactive({
  name: 'VxeUpload',
  props: {
    mode: 'image',
    multiple: true,
    urlMode: true,
    showButtonText: false,
    pasteToUpload: true,
    dragSort: true,
    progressText: '{percent}%',
    moreConfig: {
      maxCount: 1
    },
    imageConfig: {
      width: 40,
      height: 40
    },
    uploadMethod ({ file, updateProgress }) {
      const formData = new FormData()
      formData.append('file', file)
      return axios.post('http://localhost:3000/goods/upload', formData, {
        // 显示进度
        onUploadProgress (progressEvent) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 0))
          updateProgress(percentCompleted)
        }
      }).then((res) => {
        const imgListUrl=res.data.data[0]
        return {
          ...res.data.data[0]
        }
      })
    }
  }
})
const fileListCellRender = reactive({
  name: 'VxeUpload',
  props: {
    multiple: true,
    urlMode: true,
    showButtonText: false,
    pasteToUpload: true,
    dragSort: true,
    progressText: '{percent}%',
    moreConfig: {
      maxCount: 1,
      layout: 'horizontal'
    },
    uploadMethod ({ file, updateProgress }) {
      const formData = new FormData()
      formData.append('file', file)
      return axios.post('/api/pub/upload/single', formData, {
        // 显示进度
        onUploadProgress (progressEvent) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 0))
          updateProgress(percentCompleted)
        }
      }).then((res) => {
        // { url: ''}
        return {
          ...res.data
        }
      })
    }
  }
})
const dataOptions = ref([
  { label: '加载 3 行', value: 3 },
  { label: '加载 10 行', value: 10 },
  { label: '加载 20 行', value: 20 },
  { label: '加载 100 行', value: 100 },
])
const flag1CellRender = reactive({
  name: 'VxeSwitch',
  props: { value: true },
})
const cityEditRender = reactive({
  name: 'VxeSelect',
  options: [
    { label: '深圳市', value: 'sz' },
    { label: '广州市', value: 'gz' },
    { label: '北京市', value: 'bj' },
    { label: '上海市', value: 'sh' },
    { label: '杭州市', value: 'hz' },
    { label: '石家庄市', value: 'sjz' },
    { label: '唐山市', value: 'ts' },
    { label: '天津市', value: 'tj' },
  ],
})
const gridOptions = reactive({
  border: true,
  loading: false,
  stripe: true,
  showOverflow: true,
  keepSource: true,
  height: '100%',
  columnConfig: {
    resizable: true,
  },
  rowConfig: {
    useKey: true,
    isHover: true,
    height: 150,
  },
  toolbarConfig: {
    custom: true,
    slots: {
      buttons: 'toolbarButtons',
    },
  },
  checkboxConfig: {
    range: true,
  },
  editConfig: {
    mode: 'cell',
    trigger: 'dblclick',
    showStatus: true,
  },
  mouseConfig: {
    selected: true,
  },
  keyboardConfig: {
    isEdit: true,
    isArrow: true,
    isEnter: true,
    isBack: true,
    isDel: true,
    isEsc: true,
  },
  scrollX: {
    gt: 0,
    enabled: true,
  },
  scrollY: {
    gt: 0,
    mode: 'wheel',
    enabled: true,
  },
  editRules: {
    name: [{ required: true, content: '请输入名字' }],
  },
  columns: [
    { field: 'seq', type: 'seq', fixed: 'left', width: 60 },
    { field: 'checkbox', type: 'checkbox', fixed: 'left', width: 60 },
    {
      field: 'name',
      title: '商品名称',
      minWidth: 150,
      dragSort: true,
      editRender: { name: 'VxeInput' },
    },
    {
      title: '基本信息',
      field: 'info',
      children: [
        {
          field: 'description',
          title: '描述',
          width: 140,
          editRender: { name: 'VxeInput' },
        },
        {
          field: 'city',
          title: '生产地',
          width: 140,
          editRender: cityEditRender,
        },
        { field: 'imgList', title: '图片列表', width: 210, cellRender: imgListCellRender },
        { field: 'fileList', title: '附件列表', width: 300, cellRender: fileListCellRender},
        {
          field: 'count',
          title: '数量',
          width: 140,
          editRender: { name: 'VxeNumberInput', props: { type: 'number' } },
        },
        {
          field: 'price',
          title: '价格',
          width: 120,
          editRender: { name: 'VxeNumberInput', props: { type: 'float' } },
        },
        {
          field: 'production',
          title: '厂商',
          width: 150,
          editRender: { name: 'VxeInput' },
        },
      ],
    },
    {
      field: 'flag',
      title: '是否上架',
      width: 140,
      cellRender: flag1CellRender,
    },
    {
      field: 'active',
      title: '操作',
      fixed: 'right',
      width: 80,
      slots: { default: 'active' },
    },
  ],
})

//查找
const loadDataForm = async rSize => {
  gridOptions.loading = true
  try {
    const response = await goods.list({ pageNo: 1, pageSize: rSize })
    const data = response.data.data || []
    if (Array.isArray(data)) {
      const $grid = gridRef.value
      if ($grid) {
        $grid.reloadData(data)
      }
    } else {
      console.error('返回的数据格式错误，应为一个数组', response)
      VxeUI.modal.message({
        content: '数据格式错误，无法加载',
        status: 'error',
      })
    }
  } catch (error) {
    console.error('数据加载失败:', error)
    VxeUI.modal.message({
      content: '加载数据失败',
      status: 'error',
    })
  } finally {
    gridOptions.loading = false
  }
}
//更改加载行数
const changeRowSizeEvent = () => {
  loadDataForm(selectRowSize.value)
}
//增加空白行
// const addEvent = async () => {
//   const $grid = gridRef.value
//   if ($grid) {
//     const record = {
//       name: '',
//       description: '',
//       price: '',
//       city: '',
//       flag: false,
//       count: '',
//     }
//     const { row: newRow } = await $grid.insertAt(record, null)
//     $grid.setPendingRow(newRow)
//   }
// }
const addEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const record = {
      name: '',
      description: '',
      price: 0,
      city: 'sz',
      flag: false,
      count: 0,
      images: '' // 明确初始化图片字段
    }
    const { row: newRow } = await $grid.insertAt(record, null)
    $grid.setPendingRow(newRow)
  }
}
//选中数据
const pendingSelect = async checked => {
  const $grid = gridRef.value
  if ($grid) {
    const selectRecords = $grid.getCheckboxRecords()
    if (selectRecords.length) {
      $grid.setPendingRow(selectRecords, checked)
      $grid.clearCheckboxRow()
    } else {
      VxeUI.modal.message({
        content: '未选中数据',
        status: 'info',
      })
    }
  }
}
//移出一行
const removeRow = async row => {
  try {
    const { _id } = row
    await goods.deletes(_id)
    gridRef.value.remove(row)
    VxeUI.modal.message({ content: '删除成功', status: 'success' })
    loadDataForm(selectRowSize.value)
  } catch (error) {
    console.error('删除失败:', error)
    VxeUI.modal.message({ content: '删除失败', status: 'error' })
  }
}
//保存，(修改，添加)
// const saveEvent = async () => {
//   const $grid = gridRef.value
//   if ($grid) {
//     const errMap = await $grid.validate(true)
//     if (errMap) {
//       return
//     }
//     const { insertRecords, updateRecords, removeRecords } = $grid.getRecordset()
//     const pendingRecords = $grid.getPendingRecords()
//     try {
//       await Promise.all([
//         ...insertRecords.map(record => goods.add(record)),
//         ...updateRecords.map(record => goods.update(record)),
//       ])
//       VxeUI.modal.alert({
//         title: '商品管理器',
//         content: `新增：${insertRecords.length} 行，已删除：${removeRecords.length} 行，待删除：${pendingRecords.length} 行，修改：${updateRecords.length} 行`,
//       })
//       loadDataForm(selectRowSize.value)
//     } catch (error) {
//       console.error('保存失败', error)
//       VxeUI.modal.message({
//         content: '保存失败',
//         status: 'error',
//       })
//     }
//   }
// }
// const saveEvent = async () => {
//   const $grid = gridRef.value
//   if ($grid) {
//     const errMap = await $grid.validate(true)
//     if (errMap) {
//       return
//     }

//     const { insertRecords, updateRecords, removeRecords } = $grid.getRecordset()
//     const pendingRecords = $grid.getPendingRecords()

//     try {
//       // 处理新增记录
//       await Promise.all(
//         insertRecords.map(record => {
//           console.log(record)
//           // 确保 images 字段存在
//           if (!record.images) {
//             record.images = '' // 如果没有图片，设置为空字符串
//           }
//           return goods.add(record)
//         })
//       )

//       // 处理更新记录
//       // await Promise.all(
//       //   updateRecords.map(record => {
//       //     // 确保 images 字段存在
//       //     console.log(record);

//       //     if (!record.images) {
//       //       record.images = ''; // 如果没有图片，设置为空字符串
//       //     }
//       //     return goods.update(record);
//       //   })
//       // );
//       await Promise.all(
//         updateRecords.map(async record => {
//           // 过滤无效数据
//           const validData = {
//             _id: record._id, // 确保携带ID
//             name: record.name,
//             description: record.description,
//             images: record.images || '',
//             // 其他字段...
//           }

//           return goods.update(validData)
//         })
//       )

//       VxeUI.modal.alert({
//         title: '商品管理器',
//         content: `新增：${insertRecords.length} 行，已删除：${removeRecords.length} 行，待删除：${pendingRecords.length} 行，修改：${updateRecords.length} 行`,
//       })

//       // 重新加载数据
//       loadDataForm(selectRowSize.value)
//     } catch (error) {
//       console.error('保存失败', error)
//       VxeUI.modal.message({
//         content: '保存失败',
//         status: 'error',
//       })
//     }
//   }
// }
const saveEvent = async () => {
  const $grid = gridRef.value
  if ($grid) {
    const errMap = await $grid.validate(true)
    if (errMap) return

    const { insertRecords, updateRecords, removeRecords } = $grid.getRecordset()
    const pendingRecords = $grid.getPendingRecords()

    try {
      // 处理新增记录（确保包含 images 字段）
      await Promise.all(insertRecords.map(record =>
        goods.add({
          ...record,
          images: record.images || '' // 处理空值
        })
      ))

      // 处理更新记录（过滤有效字段）
      await Promise.all(updateRecords.map((record) =>
      
        goods.update({
          _id: record._id,
          name: record.name,
          description: record.description,
          city: record.city,
          count: record.count,
          price: record.price,
          production: record.production,
          flag: record.flag,
          images: record.images || '' // 确保包含图片
        })
        
      ))

      VxeUI.modal.alert({
        title: '商品管理器',
        content: `新增：${insertRecords.length} 行，已删除：${removeRecords.length} 行，待删除：${pendingRecords.length} 行，修改：${updateRecords.length} 行`,
      })

      loadDataForm(selectRowSize.value)
    } catch (error) {
      console.error('保存失败', error)
      VxeUI.modal.message({
        content: `保存失败: ${error.response?.data?.message || error.message}`,
        status: 'error'
      })
    }
  }
}
nextTick(() => {
  loadDataForm(selectRowSize.value)
})
</script>
<style lang="scss" scoped>
@import url(./index.scss);
.vxe-table {
  .vxe-cell--image {
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 4px;
      transition: transform 0.3s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
